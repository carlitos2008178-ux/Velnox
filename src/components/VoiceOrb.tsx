import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUp, LoaderCircle, Mic, Square } from 'lucide-react'

// Orbe WebGL basado en "Orb" de React Bits (MIT). Al pulsarlo escucha la pregunta,
// la envía a VelIA (/api/velia, Claude) y lee la respuesta en voz alta.

const vert = /* glsl */ `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const frag = /* glsl */ `
  precision highp float;

  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hue;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  uniform vec3 backgroundColor;
  varying vec2 vUv;

  vec3 rgb2yiq(vec3 c) {
    float y = dot(c, vec3(0.299, 0.587, 0.114));
    float i = dot(c, vec3(0.596, -0.274, -0.322));
    float q = dot(c, vec3(0.211, -0.523, 0.312));
    return vec3(y, i, q);
  }

  vec3 yiq2rgb(vec3 c) {
    float r = c.x + 0.956 * c.y + 0.621 * c.z;
    float g = c.x - 0.272 * c.y - 0.647 * c.z;
    float b = c.x - 1.106 * c.y + 1.703 * c.z;
    return vec3(r, g, b);
  }

  vec3 adjustHue(vec3 color, float hueDeg) {
    float hueRad = hueDeg * 3.14159265 / 180.0;
    vec3 yiq = rgb2yiq(color);
    float cosA = cos(hueRad);
    float sinA = sin(hueRad);
    float i = yiq.y * cosA - yiq.z * sinA;
    float q = yiq.y * sinA + yiq.z * cosA;
    yiq.y = i;
    yiq.z = q;
    return yiq2rgb(yiq);
  }

  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
  }

  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;
    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(
      dot(d0, hash33(i)),
      dot(d1, hash33(i + i1)),
      dot(d2, hash33(i + i2)),
      dot(d3, hash33(i + 1.0))
    );
    return dot(vec4(31.316), n);
  }

  vec4 extractAlpha(vec3 colorIn) {
    float a = max(max(colorIn.r, colorIn.g), colorIn.b);
    return vec4(colorIn.rgb / (a + 1e-5), a);
  }

  const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
  const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
  const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
  const float innerRadius = 0.6;
  const float noiseScale = 0.65;

  float light1(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * attenuation);
  }

  float light2(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * dist * attenuation);
  }

  vec4 draw(vec2 uv) {
    vec3 color1 = adjustHue(baseColor1, hue);
    vec3 color2 = adjustHue(baseColor2, hue);
    vec3 color3 = adjustHue(baseColor3, hue);

    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float invLen = len > 0.0 ? 1.0 / len : 0.0;

    float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));

    float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
    float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
    float d0 = distance(uv, (r0 * invLen) * uv);
    float v0 = light1(1.0, 10.0, d0);

    v0 *= smoothstep(r0 * 1.05, r0, len);
    float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
    v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
    float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

    float a = iTime * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    float d = distance(uv, pos);
    float v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);

    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

    vec3 colBase = mix(color1, color2, cl);
    float fadeAmount = mix(1.0, 0.1, bgLuminance);

    vec3 darkCol = mix(color3, colBase, v0);
    darkCol = (darkCol + v1) * v2 * v3;
    darkCol = clamp(darkCol, 0.0, 1.0);

    vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
    lightCol = mix(backgroundColor, lightCol, v0);
    lightCol = clamp(lightCol, 0.0, 1.0);

    vec3 finalCol = mix(darkCol, lightCol, bgLuminance);

    return extractAlpha(finalCol);
  }

  vec4 mainImage(vec2 fragCoord) {
    vec2 center = iResolution.xy * 0.5;
    float size = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord - center) / size * 2.0;

    float s = sin(rot);
    float c = cos(rot);
    uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

    uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
    uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);

    return draw(uv);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 col = mainImage(fragCoord);
    gl_FragColor = vec4(col.rgb * col.a, col.a);
  }
`

export default function VoiceOrb({ hue = 0, className = '' }: { hue?: number; className?: string }) {
  const ctnDom = useRef<HTMLDivElement>(null)
  const levelRef = useRef(0)
  const phaseRef = useRef<Phase>('idle')
  const [phase, setPhaseState] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)
  const [reply, setReply] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const audioRef = useRef<{ stream: MediaStream; ctx: AudioContext; raf: number } | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const historyRef = useRef<Turn[]>([])
  const requestRef = useRef<AbortController | null>(null)

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }

  useEffect(() => {
    const container = ctnDom.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    container.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: 0.2 },
        backgroundColor: { value: new Vec3(0, 0, 0) },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    function resize() {
      if (!container) return
      const dpr = window.devicePixelRatio || 1
      renderer.setSize(container.clientWidth * dpr, container.clientHeight * dpr)
      gl.canvas.style.width = container.clientWidth + 'px'
      gl.canvas.style.height = container.clientHeight + 'px'
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    let mouseHover = 0
    const onEnter = () => (mouseHover = 1)
    const onLeave = () => (mouseHover = 0)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    let lastTime = 0
    let currentRot = 0
    let rafId = 0
    const update = (t: number) => {
      rafId = requestAnimationFrame(update)
      const dt = (t - lastTime) * 0.001
      lastTime = t
      // Mientras VelIA habla no hay micrófono: se simula una voz que late.
      const phaseNow = phaseRef.current
      const level =
        phaseNow === 'speaking'
          ? 0.05 + 0.05 * Math.abs(Math.sin(t * 0.011) * Math.sin(t * 0.0047))
          : phaseNow === 'thinking'
            ? 0.03
            : levelRef.current
      program.uniforms.iTime.value = t * 0.001
      // La voz deforma y acelera el orbe; sin voz se comporta como el hover original.
      const target = Math.max(mouseHover, Math.min(1, level * 4))
      program.uniforms.hover.value += (target - program.uniforms.hover.value) * 0.15
      program.uniforms.hoverIntensity.value = 0.2 + level * 2.5
      currentRot += dt * (0.3 * program.uniforms.hover.value + level * 2)
      program.uniforms.rot.value = currentRot
      renderer.render({ scene: mesh })
    }
    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
      container.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [hue])

  // Nivel del micrófono para animar el orbe mientras escucha.
  async function startMicLevel() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    ctx.createMediaStreamSource(stream).connect(analyser)
    const data = new Uint8Array(analyser.fftSize)
    const tick = () => {
      if (!audioRef.current) return
      analyser.getByteTimeDomainData(data)
      let sum = 0
      for (const v of data) sum += ((v - 128) / 128) ** 2
      const rms = Math.sqrt(sum / data.length)
      levelRef.current += (rms - levelRef.current) * 0.3
      audioRef.current.raf = requestAnimationFrame(tick)
    }
    audioRef.current = { stream, ctx, raf: 0 }
    tick()
  }

  function stopMic() {
    const a = audioRef.current
    if (!a) return
    cancelAnimationFrame(a.raf)
    a.stream.getTracks().forEach((tr) => tr.stop())
    a.ctx.close()
    audioRef.current = null
    levelRef.current = 0
  }

  function stopAll() {
    recognitionRef.current?.abort()
    recognitionRef.current = null
    stopMic()
    requestRef.current?.abort()
    requestRef.current = null
    window.speechSynthesis?.cancel()
  }

  useEffect(() => () => stopAll(), [])

  async function onOrbClick() {
    if (phaseRef.current !== 'idle') {
      stopAll()
      setPhase('idle')
      return
    }
    const Recognition = getRecognition()
    if (!Recognition) {
      setError('Tu navegador no admite dictado por voz. Prueba con Chrome.')
      return
    }
    setError(null)
    try {
      await startMicLevel()
    } catch {
      setError('Micrófono no disponible')
      return
    }

    const rec = new Recognition()
    rec.lang = 'es-ES'
    rec.interimResults = false
    rec.continuous = false
    rec.maxAlternatives = 1
    let heard = ''
    rec.onresult = (e) => {
      heard = Array.from(e.results, (r) => r[0].transcript).join(' ').trim()
    }
    rec.onerror = (e) => {
      if (e.error === 'not-allowed') setError('Permiso de micrófono denegado')
      else if (e.error !== 'no-speech' && e.error !== 'aborted') setError('No te he entendido, prueba otra vez')
    }
    rec.onend = () => {
      recognitionRef.current = null
      stopMic()
      if (phaseRef.current !== 'listening') return
      if (heard) void ask(heard)
      else setPhase('idle')
    }
    recognitionRef.current = rec
    setPhase('listening')
    rec.start()
  }

  function onSubmitText(e: FormEvent) {
    e.preventDefault()
    const question = draft.trim()
    if (!question) return
    stopAll()
    setError(null)
    setDraft('')
    void ask(question)
  }

  async function ask(question: string) {
    setPhase('thinking')
    const history: Turn[] = [...historyRef.current, { role: 'user', content: question }]
    const ctrl = new AbortController()
    requestRef.current = ctrl
    try {
      const res = await fetch('/api/velia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
      })
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string }
      if (!res.ok || !data.reply) throw new Error(data.error ?? 'VelIA no está disponible ahora mismo')
      historyRef.current = [...history, { role: 'assistant', content: data.reply }]
      setReply(data.reply)
      speak(data.reply)
    } catch (err) {
      if (ctrl.signal.aborted) return
      setError(err instanceof Error ? err.message : 'VelIA no está disponible ahora mismo')
      setPhase('idle')
    } finally {
      if (requestRef.current === ctrl) requestRef.current = null
    }
  }

  function speak(text: string) {
    const synth = window.speechSynthesis
    if (!synth) return setPhase('idle')
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-ES'
    const voice = synth.getVoices().find((v) => v.lang.startsWith('es'))
    if (voice) utterance.voice = voice
    const done = () => {
      if (phaseRef.current === 'speaking') setPhase('idle')
    }
    utterance.onend = done
    utterance.onerror = done
    setPhase('speaking')
    synth.cancel()
    synth.speak(utterance)
  }

  const status = error ?? STATUS[phase]

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={onOrbClick}
        aria-label={phase === 'idle' ? 'Preguntar a VelIA' : 'Detener a VelIA'}
        className="relative h-32 w-32 cursor-pointer rounded-full"
      >
        <div ref={ctnDom} className="absolute inset-0" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-foreground/80">
          {phase === 'thinking' ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : phase === 'speaking' ? (
            <Square size={14} />
          ) : (
            <Mic size={18} />
          )}
        </span>
      </button>
      <p className="max-w-[12rem] text-center text-sm font-medium text-foreground">¡Pregúntale a VelIA tus dudas!</p>
      <p className="-mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground" aria-live="polite">
        {status}
      </p>
      <form onSubmit={onSubmitText} className="flex w-full max-w-[16rem] items-center gap-1 rounded-full border border-border bg-white/[0.04] p-1">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={500}
          placeholder="O escribe tu pregunta…"
          aria-label="Escribe tu pregunta para VelIA"
          className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-xs outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!draft.trim() || phase === 'thinking'}
          aria-label="Enviar pregunta"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:opacity-30"
        >
          <ArrowUp size={14} />
        </button>
      </form>
      {reply && (
        <p className="max-h-40 max-w-[16rem] overflow-y-auto text-center text-xs leading-relaxed text-muted-foreground">
          {reply}
        </p>
      )}
    </div>
  )
}

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking'
type Turn = { role: 'user' | 'assistant'; content: string }

const STATUS: Record<Phase, string> = {
  idle: 'Pulsa y habla',
  listening: 'Escuchando…',
  thinking: 'Pensando…',
  speaking: 'Respondiendo · pulsa para parar',
}

// Web Speech API: Chrome y Edge la exponen con prefijo y TypeScript no la tipa.
interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start(): void
  abort(): void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}

type RecognitionCtor = new () => SpeechRecognitionLike

function getRecognition(): RecognitionCtor | undefined {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}
