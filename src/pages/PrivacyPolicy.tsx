import { useEffect, type ReactNode } from 'react'
import EmailLink, { CONTACT_EMAIL } from '../components/ui/EmailLink'

// Datos identificativos del titular (art. 13 RGPD y art. 10 LSSI).
// Los que van entre corchetes están pendientes de rellenar.
const OWNER = {
  name: '[Nombre y apellidos o razón social]',
  taxId: '[NIF / CIF]',
  address: '[Domicilio completo]',
  brand: 'Velnox',
  phones: '696 79 17 22 / 636 74 72 42',
}

const LAST_UPDATED = '4 de octubre de 2026'

const SECTIONS = [
  { id: 'responsable', title: 'Responsable del tratamiento' },
  { id: 'ambito', title: 'Ámbito de aplicación' },
  { id: 'datos', title: 'Qué datos tratamos' },
  { id: 'finalidades', title: 'Finalidades y bases jurídicas' },
  { id: 'velia', title: 'Asistente VelIA' },
  { id: 'encargado', title: 'Datos de los clientes de tu restaurante' },
  { id: 'conservacion', title: 'Plazos de conservación' },
  { id: 'destinatarios', title: 'Destinatarios y proveedores' },
  { id: 'transferencias', title: 'Transferencias internacionales' },
  { id: 'decisiones', title: 'Decisiones automatizadas' },
  { id: 'derechos', title: 'Tus derechos' },
  { id: 'seguridad', title: 'Seguridad de la información' },
  { id: 'menores', title: 'Menores de edad' },
  { id: 'cookies', title: 'Cookies y tecnologías similares' },
  { id: 'veracidad', title: 'Veracidad de los datos' },
  { id: 'terceros', title: 'Enlaces a sitios de terceros' },
  { id: 'cambios', title: 'Cambios en esta política' },
  { id: 'normativa', title: 'Normativa aplicable' },
]

const PURPOSES = [
  {
    purpose: 'Atender tu solicitud de auditoría gratuita y preparar una propuesta personalizada.',
    basis: 'Aplicación de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).',
  },
  {
    purpose: 'Responder a las consultas que nos envíes por correo electrónico, teléfono o WhatsApp.',
    basis: 'Consentimiento del interesado (art. 6.1.a RGPD) y, en su caso, medidas precontractuales (art. 6.1.b RGPD).',
  },
  {
    purpose: 'Prestar los servicios contratados (Sistema Mesa Llena), gestionar la relación comercial, el soporte y los informes mensuales.',
    basis: 'Ejecución del contrato (art. 6.1.b RGPD).',
  },
  {
    purpose: 'Emitir facturas, llevar la contabilidad y cumplir las obligaciones fiscales y legales.',
    basis: 'Cumplimiento de obligaciones legales (art. 6.1.c RGPD).',
  },
  {
    purpose: 'Enviarte información sobre novedades y servicios de Velnox similares a los contratados.',
    basis: 'Interés legítimo para clientes (art. 21.2 LSSI) o consentimiento expreso en el resto de casos (art. 6.1.a RGPD). Puedes oponerte en cualquier momento.',
  },
  {
    purpose: 'Garantizar la seguridad, disponibilidad y correcto funcionamiento de la web y prevenir el fraude o los abusos.',
    basis: 'Interés legítimo del responsable (art. 6.1.f RGPD).',
  },
]

const RETENTION = [
  { what: 'Solicitudes de auditoría y consultas que no deriven en contratación', time: 'Hasta 12 meses desde el último contacto.' },
  { what: 'Datos de clientes y de la relación contractual', time: 'Mientras dure el contrato y, después, durante los plazos de prescripción de las acciones legales (con carácter general, hasta 5 años).' },
  { what: 'Facturas y documentación contable', time: '6 años, conforme al Código de Comercio, y 4 años a efectos tributarios.' },
  { what: 'Comunicaciones comerciales', time: 'Hasta que retires tu consentimiento o te opongas.' },
  { what: 'Registros técnicos del servidor (logs)', time: 'El tiempo limitado que conserve el proveedor de alojamiento para fines de seguridad, normalmente unos días o semanas.' },
]

const PROVIDERS = [
  { name: 'Vercel Inc.', role: 'Alojamiento y entrega de la web.', place: 'Estados Unidos y otras regiones' },
  { name: 'Google LLC / Google Ireland Ltd.', role: 'Correo electrónico (Gmail) y tipografías web (Google Fonts).', place: 'Unión Europea y Estados Unidos' },
  {
    name: 'Proveedores de telefonía, mensajería (como WhatsApp de Meta) e inteligencia artificial',
    role: 'Solo cuando prestamos el servicio contratado a un restaurante, para operar el agente de voz y WhatsApp.',
    place: 'Unión Europea y Estados Unidos',
  },
  { name: 'Asesoría fiscal y contable', role: 'Gestión contable, fiscal y de facturación.', place: 'España' },
]

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Política de privacidad — Velnox'
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-[0.2em]">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-glow-blue to-glow-violet" />
            VELNOX
          </a>
          <a href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
            ← Volver a la web
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">/Legal</p>
        <h1 className="mt-6 text-4xl font-medium leading-[1.05] md:text-6xl">
          <span className="text-fade">Política de </span>
          <span className="text-gradient">privacidad</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          En {OWNER.brand} nos tomamos en serio la protección de tus datos personales. Esta política explica de forma clara
          qué datos tratamos, para qué, durante cuánto tiempo y qué derechos tienes, conforme al Reglamento General de
          Protección de Datos (RGPD) y a la normativa española.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[16rem_1fr]">
          <nav aria-label="Índice" className="md:sticky md:top-24 md:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground">Índice</p>
            <ol className="mt-4 space-y-2 text-sm">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 space-y-14 text-[15px] leading-relaxed text-foreground/85">
            <Section n={0}>
              <dl className="card-glass grid gap-x-6 gap-y-3 rounded-2xl p-6 sm:grid-cols-[10rem_1fr]">
                <Dt>Titular</Dt>
                <dd>{OWNER.name}</dd>
                <Dt>NIF / CIF</Dt>
                <dd>{OWNER.taxId}</dd>
                <Dt>Domicilio</Dt>
                <dd>{OWNER.address}</dd>
                <Dt>Nombre comercial</Dt>
                <dd>{OWNER.brand}</dd>
                <Dt>Correo electrónico</Dt>
                <dd>
                  <Mail />
                </dd>
                <Dt>Teléfono</Dt>
                <dd>{OWNER.phones}</dd>
              </dl>
              <p>
                Para cualquier cuestión relacionada con la protección de tus datos puedes escribirnos a <Mail />, indicando
                «Protección de datos» en el asunto.
              </p>
            </Section>

            <Section n={1}>
              <p>
                Esta política se aplica a los datos personales que tratamos a través de este sitio web, de nuestros canales
                de contacto (correo electrónico, teléfono y WhatsApp) y en el marco de la relación comercial con los
                restaurantes que contratan nuestros servicios.
              </p>
              <p>
                Nuestros servicios se dirigen a profesionales y empresas del sector de la restauración. Cuando nos facilitas
                datos de contacto profesionales en nombre de un restaurante, también los tratamos conforme a esta política.
              </p>
            </Section>

            <Section n={2}>
              <p>Solo tratamos los datos estrictamente necesarios para cada finalidad:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-medium text-foreground">Datos identificativos y de contacto:</strong> nombre,
                  correo electrónico, teléfono y nombre del restaurante que nos facilites al solicitar la auditoría o al
                  contactarnos.
                </li>
                <li>
                  <strong className="font-medium text-foreground">Datos del negocio:</strong> información sobre reservas,
                  cancelaciones, horarios y facturación del restaurante que compartas con nosotros para realizar la
                  auditoría o prestar el servicio.
                </li>
                <li>
                  <strong className="font-medium text-foreground">Datos contractuales y de facturación:</strong> razón
                  social, NIF, dirección fiscal, datos de pago y plan contratado.
                </li>
                <li>
                  <strong className="font-medium text-foreground">Contenido de tus comunicaciones:</strong> los mensajes,
                  correos o llamadas que intercambies con nosotros.
                </li>
                <li>
                  <strong className="font-medium text-foreground">Datos técnicos de navegación:</strong> dirección IP,
                  tipo de navegador, sistema operativo y fecha y hora de acceso, que se registran automáticamente por
                  motivos de seguridad y funcionamiento.
                </li>
              </ul>
              <p>
                No solicitamos categorías especiales de datos (salud, ideología, origen étnico, etc.). Te pedimos que no
                nos las facilites.
              </p>
            </Section>

            <Section n={3}>
              <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    <tr>
                      <th className="p-4 font-normal">Finalidad</th>
                      <th className="p-4 font-normal">Base jurídica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PURPOSES.map((p) => (
                      <tr key={p.purpose} className="border-t border-border align-top">
                        <td className="p-4">{p.purpose}</td>
                        <td className="p-4 text-muted-foreground">{p.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Los datos marcados como necesarios en nuestros formularios son imprescindibles para atender tu solicitud.
                Si no nos los facilitas, no podremos gestionarla.
              </p>
            </Section>

            <Section n={4}>
              <p>
                VelIA, el asistente de la web, responde a tus dudas con información preparada sobre Velnox. Las respuestas
                se generan directamente en tu navegador: <strong className="font-medium text-foreground">las preguntas
                que escribes o dictas no se envían a Velnox ni se almacenan</strong>.
              </p>
              <p>
                Si usas el micrófono, el dictado por voz lo realiza la función de reconocimiento de voz de tu navegador.
                Algunos navegadores, como Google Chrome o Microsoft Edge, pueden enviar el audio a los servidores de su
                fabricante para transcribirlo, conforme a sus propias políticas de privacidad. El acceso al micrófono
                solo se activa cuando pulsas el orbe y tu navegador te pide permiso; puedes retirarlo en cualquier momento
                desde su configuración. Si lo prefieres, puedes escribir la pregunta en lugar de dictarla.
              </p>
            </Section>

            <Section n={5}>
              <p>
                Cuando un restaurante contrata nuestros servicios, el Sistema Mesa Llena trata datos de sus comensales
                (como nombre, teléfono y datos de la reserva) para gestionar reservas, confirmaciones, recordatorios y
                listas de espera.
              </p>
              <p>
                En ese caso, el restaurante es el <strong className="font-medium text-foreground">responsable del
                tratamiento</strong> y {OWNER.brand} actúa como <strong className="font-medium text-foreground">encargado
                del tratamiento</strong>, tratando los datos únicamente siguiendo sus instrucciones y conforme a un
                contrato de encargo que cumple el artículo 28 del RGPD. Los comensales que quieran ejercer sus derechos
                deben dirigirse al restaurante; si nos llega su solicitud, se la trasladaremos sin demora.
              </p>
            </Section>

            <Section n={6}>
              <p>Conservamos los datos solo durante el tiempo necesario para la finalidad para la que se recogieron:</p>
              <ul className="space-y-3">
                {RETENTION.map((r) => (
                  <li key={r.what} className="card-glass rounded-2xl p-4">
                    <p className="font-medium text-foreground">{r.what}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.time}</p>
                  </li>
                ))}
              </ul>
              <p>
                Transcurridos estos plazos, los datos se suprimen o se bloquean durante el tiempo en que puedan derivarse
                responsabilidades legales, y después se eliminan de forma segura.
              </p>
            </Section>

            <Section n={7}>
              <p>
                No vendemos ni cedemos tus datos a terceros, salvo obligación legal (por ejemplo, a la Agencia Tributaria,
                a jueces y tribunales o a las fuerzas y cuerpos de seguridad cuando lo requieran).
              </p>
              <p>
                Para prestar nuestros servicios contamos con proveedores que acceden a los datos como encargados del
                tratamiento, con los que hemos firmado o aceptado los correspondientes contratos de encargo:
              </p>
              <ul className="space-y-3">
                {PROVIDERS.map((p) => (
                  <li key={p.name} className="card-glass rounded-2xl p-4">
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{p.place}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section n={8}>
              <p>
                Algunos de nuestros proveedores tienen su sede o servidores fuera del Espacio Económico Europeo,
                principalmente en Estados Unidos. Estas transferencias se realizan con las garantías previstas en el RGPD:
                la adhesión del proveedor al Marco de Privacidad de Datos UE-EE. UU. (EU-U.S. Data Privacy Framework),
                basado en una decisión de adecuación de la Comisión Europea, o la firma de las cláusulas contractuales
                tipo aprobadas por la Comisión Europea.
              </p>
            </Section>

            <Section n={9}>
              <p>
                No tomamos decisiones basadas únicamente en el tratamiento automatizado de tus datos, incluida la
                elaboración de perfiles, que produzcan efectos jurídicos sobre ti o te afecten significativamente de modo
                similar.
              </p>
            </Section>

            <Section n={10}>
              <p>Puedes ejercer en cualquier momento, de forma gratuita, los siguientes derechos:</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Acceso', 'Saber si tratamos tus datos y obtener una copia.'],
                  ['Rectificación', 'Corregir datos inexactos o incompletos.'],
                  ['Supresión', 'Pedir que eliminemos tus datos cuando ya no sean necesarios.'],
                  ['Oposición', 'Oponerte a un tratamiento, incluido el envío de comunicaciones comerciales.'],
                  ['Limitación', 'Solicitar que suspendamos el tratamiento en determinados casos.'],
                  ['Portabilidad', 'Recibir tus datos en un formato estructurado y de uso común.'],
                ].map(([right, desc]) => (
                  <li key={right} className="card-glass rounded-2xl p-4">
                    <p className="font-medium text-foreground">{right}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </li>
                ))}
              </ul>
              <p>
                También puedes retirar el consentimiento que nos hayas dado, sin que ello afecte a la licitud del
                tratamiento anterior.
              </p>
              <p>
                Para ejercerlos, escríbenos a <Mail /> con el asunto «Protección de datos», indicando el derecho que
                quieres ejercer. Si tenemos dudas razonables sobre tu identidad, podremos pedirte información adicional
                para confirmarla. Te responderemos en el plazo máximo de un mes, prorrogable dos meses más en casos
                complejos, de lo que te informaríamos.
              </p>
              <p>
                Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante la
                Agencia Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet"
                >
                  www.aepd.es
                </a>
                ), C/ Jorge Juan 6, 28001 Madrid.
              </p>
            </Section>

            <Section n={11}>
              <p>
                Aplicamos medidas técnicas y organizativas adecuadas al riesgo para proteger tus datos frente a la
                pérdida, el uso indebido, el acceso no autorizado, la alteración o la destrucción: conexión cifrada (HTTPS)
                en toda la web, control de accesos con autenticación, acceso limitado al personal que lo necesita y
                proveedores que ofrecen garantías suficientes de seguridad.
              </p>
              <p>
                Si se produjera una brecha de seguridad que pudiera suponer un riesgo para tus derechos, lo notificaríamos
                a la autoridad de control y, cuando proceda, a las personas afectadas, en los plazos legales.
              </p>
            </Section>

            <Section n={12}>
              <p>
                Nuestros servicios no están dirigidos a menores de 14 años y no recogemos conscientemente sus datos. Si
                tienes conocimiento de que un menor nos ha facilitado datos, escríbenos y los eliminaremos.
              </p>
            </Section>

            <Section n={13}>
              <p>
                Esta web <strong className="font-medium text-foreground">no utiliza cookies propias ni de terceros con
                fines analíticos, publicitarios o de seguimiento</strong>, por lo que no necesitamos pedirte
                consentimiento para ello.
              </p>
              <p>
                Para mostrar correctamente las tipografías, tu navegador descarga las fuentes desde los servidores de
                Google Fonts, lo que implica que Google recibe tu dirección IP. Si en el futuro incorporamos cookies o
                herramientas de analítica, actualizaremos esta política y te pediremos el consentimiento cuando sea
                necesario.
              </p>
            </Section>

            <Section n={14}>
              <p>
                Garantizas que los datos que nos facilitas son veraces, exactos y están actualizados, y te comprometes a
                comunicarnos cualquier cambio. Si nos facilitas datos de otras personas (por ejemplo, de empleados del
                restaurante), te comprometes a haberles informado previamente y a contar con su autorización.
              </p>
            </Section>

            <Section n={15}>
              <p>
                Esta web puede contener enlaces a sitios de terceros, como Gmail o la Agencia Española de Protección de
                Datos. No somos responsables de sus políticas de privacidad, por lo que te recomendamos revisarlas al
                acceder a ellos.
              </p>
            </Section>

            <Section n={16}>
              <p>
                Podemos actualizar esta política para adaptarla a cambios legales o en nuestros servicios. Publicaremos
                siempre la versión vigente en esta página, indicando la fecha de la última actualización. Si los cambios
                son relevantes, te lo comunicaremos por los medios habituales.
              </p>
            </Section>

            <Section n={17}>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, General de
                  Protección de Datos (RGPD).
                </li>
                <li>
                  Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
                  digitales (LOPDGDD).
                </li>
                <li>Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).</li>
              </ul>
            </Section>
          </article>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Velnox. Todos los derechos reservados.</span>
          <a href="/" className="hover:text-foreground">
            Volver a la web
          </a>
        </div>
      </footer>
    </div>
  )
}

function Section({ n, children }: { n: number; children: ReactNode }) {
  const { id, title } = SECTIONS[n]
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="flex items-baseline gap-4 text-2xl font-medium text-foreground">
        <span className="font-mono text-xs text-muted-foreground">{String(n + 1).padStart(2, '0')}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Dt({ children }: { children: ReactNode }) {
  return <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{children}</dt>
}

function Mail() {
  return (
    <EmailLink className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
      {CONTACT_EMAIL}
    </EmailLink>
  )
}
