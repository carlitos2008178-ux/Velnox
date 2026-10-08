import type { ReactNode } from 'react'
import LegalLayout, { B, CardList, LegalSection, Mail, OwnerCard } from './LegalLayout'
import { OWNER } from './owner'

const LAST_UPDATED = '4 de octubre de 2026'

const SECTIONS = [
  { id: 'aviso-legal', title: 'Aviso legal' },
  { id: 'objeto', title: 'Objeto y aceptación' },
  { id: 'uso', title: 'Uso del sitio web' },
  { id: 'servicios', title: 'Descripción de los servicios' },
  { id: 'auditoria', title: 'Auditoría gratuita' },
  { id: 'contratacion', title: 'Contratación y planes' },
  { id: 'precios', title: 'Precios, facturación y pago' },
  { id: 'duracion', title: 'Duración, renovación y baja' },
  { id: 'implantacion', title: 'Implantación y optimización' },
  { id: 'garantia', title: 'Garantía Resultados Visibles' },
  { id: 'obligaciones', title: 'Obligaciones del cliente' },
  { id: 'cifras', title: 'Cifras y resultados orientativos' },
  { id: 'datos', title: 'Protección de datos' },
  { id: 'propiedad', title: 'Propiedad intelectual e industrial' },
  { id: 'responsabilidad', title: 'Responsabilidad' },
  { id: 'terceros', title: 'Servicios de terceros' },
  { id: 'fuerza-mayor', title: 'Fuerza mayor' },
  { id: 'suspension', title: 'Suspensión y resolución' },
  { id: 'confidencialidad', title: 'Confidencialidad' },
  { id: 'modificaciones', title: 'Modificación de las condiciones' },
  { id: 'nulidad', title: 'Nulidad parcial' },
  { id: 'ley', title: 'Legislación aplicable y jurisdicción' },
]

const PLANS = [
  {
    title: 'Esencial — 700 € al mes',
    body: 'Agente de voz y WhatsApp 24/7, confirmación automática de reservas y panel mensual básico.',
  },
  {
    title: 'Profesional — 950 € al mes',
    body: 'Todo lo del plan Esencial, más lista de espera inteligente, recordatorios para reducir no-shows y optimización guiada durante 90 días.',
  },
  {
    title: 'Premium — 1.400 € al mes',
    body: 'Todo lo del plan Profesional, más gestión multi-local, reporting consolidado y soporte prioritario dedicado.',
  },
]

const S = (props: { n: number; children: ReactNode }) => <LegalSection sections={SECTIONS} {...props} />

export default function Terms() {
  return (
    <LegalLayout
      docTitle="Términos y condiciones"
      titleStart="Términos y"
      titleAccent="condiciones"
      updated={LAST_UPDATED}
      sections={SECTIONS}
      intro={
        <>
          Estas condiciones regulan el acceso y uso de la web de {OWNER.brand} y la contratación de nuestros servicios de
          infraestructura de inteligencia artificial para restaurantes. Te recomendamos leerlas con atención antes de
          usar la web o contratar cualquiera de nuestros planes.
        </>
      }
    >
      <S n={0}>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información
          y de comercio electrónico (LSSI-CE), te informamos de los datos identificativos del titular de este sitio web:
        </p>
        <OwnerCard />
      </S>

      <S n={1}>
        <p>
          Estas condiciones generales (las «Condiciones») regulan, por un lado, el acceso y la navegación por este sitio
          web y, por otro, la relación contractual entre {OWNER.brand} y los restaurantes, grupos de restauración y demás
          profesionales que contraten sus servicios (el «Cliente»).
        </p>
        <p>
          El acceso a la web te atribuye la condición de usuario e implica la aceptación de las Condiciones relativas al
          uso del sitio. La contratación de cualquier servicio implica, además, la aceptación de las Condiciones relativas
          a la contratación. Si no estás de acuerdo con ellas, te rogamos que no utilices la web ni contrates nuestros
          servicios.
        </p>
        <p>
          Nuestros servicios se dirigen exclusivamente a profesionales y empresas. Cuando la propuesta comercial o el
          contrato firmado con el Cliente («Condiciones Particulares») establezcan algo distinto a estas Condiciones,
          prevalecerán las Condiciones Particulares.
        </p>
      </S>

      <S n={2}>
        <p>Como usuario de la web te comprometes a:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Hacer un uso adecuado y lícito del sitio, conforme a la ley, a la buena fe y al orden público.</li>
          <li>No realizar actividades que puedan dañar, sobrecargar o inutilizar la web o los sistemas que la soportan.</li>
          <li>No introducir virus, código malicioso ni cualquier otro elemento que pueda causar daños.</li>
          <li>
            No intentar acceder a áreas restringidas, ni extraer de forma automatizada o masiva contenidos de la web.
          </li>
          <li>Facilitar información veraz cuando nos contactes o solicites la auditoría.</li>
        </ul>
        <p>
          El asistente VelIA ofrece respuestas automáticas e informativas sobre {OWNER.brand}. Su contenido es orientativo,
          no constituye una oferta vinculante y, en caso de discrepancia, prevalecerán estas Condiciones y las
          Condiciones Particulares que se firmen.
        </p>
        <p>
          Podemos modificar, suspender o interrumpir la web o cualquiera de sus contenidos en cualquier momento, por
          motivos técnicos, de seguridad o de mantenimiento, sin necesidad de previo aviso.
        </p>
      </S>

      <S n={3}>
        <p>
          {OWNER.brand} implanta en el restaurante del Cliente el <B>Sistema Mesa Llena</B>, una infraestructura de
          inteligencia artificial que, según el plan contratado, puede incluir:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Un agente de voz y WhatsApp que gestiona reservas las 24 horas del día.</li>
          <li>Confirmaciones y recordatorios automáticos para reducir los no-shows.</li>
          <li>Una lista de espera inteligente para cubrir cancelaciones de última hora.</li>
          <li>Un panel mensual con la facturación recuperada, los no-shows evitados y las horas liberadas.</li>
          <li>Acompañamiento y optimización durante los primeros 90 días.</li>
        </ul>
        <p>
          El alcance concreto del servicio, los canales incluidos y la configuración se detallarán en la propuesta
          comercial que reciba el Cliente.
        </p>
      </S>

      <S n={4}>
        <p>
          La auditoría de facturación perdida es <B>gratuita y sin compromiso</B>: no requiere tarjeta, no implica
          permanencia y no obliga a contratar ningún plan. Su valor de referencia (600 €) se indica solo a efectos
          informativos.
        </p>
        <p>
          Para realizarla, el Cliente nos facilitará información sobre sus reservas, cancelaciones y horarios. Las
          estimaciones resultantes son aproximadas, se basan en los datos facilitados y en promedios del sector, y no
          constituyen una garantía de resultados. {OWNER.brand} podrá limitar el número de auditorías gratuitas que
          ofrece o retirar esta promoción en cualquier momento, sin afectar a las auditorías ya solicitadas.
        </p>
      </S>

      <S n={5}>
        <p>Los planes disponibles en la fecha de estas Condiciones son:</p>
        <CardList items={PLANS} />
        <p>
          Los precios y características publicados en la web tienen carácter informativo. El contrato se perfecciona
          cuando el Cliente acepta por escrito (incluido el correo electrónico) la propuesta comercial que le enviemos, en
          la que constarán el plan, el precio, la fecha de inicio y, en su caso, las condiciones particulares acordadas.
        </p>
        <p>
          El Cliente puede cambiar de plan comunicándolo por escrito. El cambio se aplicará a partir del siguiente periodo
          de facturación, salvo que se acuerde otra cosa.
        </p>
      </S>

      <S n={6}>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Los precios se expresan en euros y, salvo que se indique lo contrario, <B>no incluyen el IVA</B> ni otros
            impuestos aplicables, que se añadirán en la factura.
          </li>
          <li>Los servicios se facturan mensualmente y por adelantado, al inicio de cada periodo.</li>
          <li>
            El pago se realizará por domiciliación bancaria, transferencia o el medio que se indique en la propuesta
            comercial, dentro del plazo señalado en la factura.
          </li>
          <li>
            En caso de impago, {OWNER.brand} podrá suspender el servicio tras comunicarlo al Cliente con al menos 7 días de
            antelación, sin perjuicio de reclamar las cantidades adeudadas y los intereses de demora previstos en la Ley
            3/2004, de lucha contra la morosidad en las operaciones comerciales.
          </li>
          <li>
            {OWNER.brand} podrá actualizar sus precios, comunicándolo al Cliente con al menos 30 días de antelación. Si el
            Cliente no está de acuerdo, podrá darse de baja antes de que el nuevo precio sea aplicable.
          </li>
        </ul>
      </S>

      <S n={7}>
        <p>
          Salvo que las Condiciones Particulares establezcan otra cosa, los servicios se contratan por periodos mensuales
          que se renuevan automáticamente, <B>sin permanencia</B>.
        </p>
        <p>
          El Cliente puede darse de baja en cualquier momento comunicándolo por escrito a <Mail /> con al menos 15 días de
          antelación al inicio del siguiente periodo de facturación. La baja será efectiva al final del periodo en curso,
          que no se reembolsará de forma proporcional.
        </p>
        <p>
          Tras la baja, el Cliente podrá solicitar en los 30 días siguientes una copia de los datos de su restaurante en
          un formato de uso común. Pasado ese plazo, los datos se eliminarán conforme a nuestra{' '}
          <a href="/privacidad" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
            política de privacidad
          </a>
          .
        </p>
      </S>

      <S n={8}>
        <p>
          Tras la contratación, {OWNER.brand} configurará el sistema sobre la línea telefónica y los canales actuales del
          Cliente, procurando no alterar su operativa. Los plazos de implantación son orientativos y dependen, entre otros
          factores, de la colaboración del Cliente y de los proveedores de telefonía y mensajería.
        </p>
        <p>
          Durante los primeros 90 días, en los planes que la incluyen, ajustaremos guiones, horarios y reglas del sistema
          según los datos reales del restaurante. A partir de entonces, el servicio continuará con el mantenimiento y el
          soporte propios del plan contratado.
        </p>
      </S>

      <S n={9}>
        <p>
          Si, una vez concluido el periodo de optimización, el panel mensual no muestra resultados visibles en las
          métricas del servicio (facturación recuperada, no-shows evitados u horas liberadas), {OWNER.brand} seguirá
          trabajando en la optimización del sistema <B>sin coste adicional</B> hasta lograrlo.
        </p>
        <p>La garantía está sujeta a que:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>El Cliente esté al corriente de pago.</li>
          <li>El Cliente haya cumplido sus obligaciones de colaboración y haya mantenido activo el sistema.</li>
          <li>
            La falta de resultados no se deba a causas ajenas a {OWNER.brand}, como cierres del local, cambios sustanciales
            en el negocio o fallos de servicios de terceros.
          </li>
        </ul>
        <p>
          La garantía consiste en el trabajo adicional de optimización descrito y no implica la devolución de las
          cantidades abonadas, salvo que las Condiciones Particulares dispongan otra cosa.
        </p>
      </S>

      <S n={10}>
        <p>El Cliente se compromete a:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Facilitar información veraz y completa, así como los accesos necesarios para implantar el sistema.</li>
          <li>Designar a una persona de contacto y colaborar de forma razonable durante la implantación y la optimización.</li>
          <li>Pagar el precio en los plazos acordados.</li>
          <li>
            Informar a sus clientes (comensales) del tratamiento de sus datos y del uso de un asistente automatizado,
            mediante su propia política de privacidad, y contar con la base legal necesaria para ese tratamiento.
          </li>
          <li>Usar el servicio de forma lícita, sin enviar comunicaciones no solicitadas ni contenidos ilícitos.</li>
          <li>Custodiar las credenciales de acceso que se le faciliten y comunicar cualquier uso no autorizado.</li>
        </ul>
      </S>

      <S n={11}>
        <p>
          Las cifras que aparecen en la web, como importes de facturación perdida o recuperada, porcentajes de reducción de
          no-shows o de atención sin esperas, son <B>estimaciones y promedios</B> obtenidos a partir de datos del sector y
          de nuestra experiencia. Los resultados de cada restaurante dependen de múltiples factores (ubicación, volumen de
          reservas, temporada, operativa, etc.) y no están garantizados, sin perjuicio de lo dispuesto en la Garantía
          Resultados Visibles.
        </p>
      </S>

      <S n={12}>
        <p>
          El tratamiento de los datos personales de los usuarios y Clientes se rige por nuestra{' '}
          <a href="/privacidad" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
            política de privacidad
          </a>
          .
        </p>
        <p>
          Respecto a los datos de los comensales del Cliente, el Cliente actúa como responsable del tratamiento y{' '}
          {OWNER.brand} como encargado del tratamiento. Ambas partes suscribirán el correspondiente contrato de encargo
          conforme al artículo 28 del Reglamento General de Protección de Datos, que forma parte de la relación
          contractual.
        </p>
      </S>

      <S n={13}>
        <p>
          Todos los contenidos de la web (textos, diseño, gráficos, logotipos, código fuente, marcas y nombres comerciales,
          incluidos «{OWNER.brand}» y «Sistema Mesa Llena») son titularidad de {OWNER.brand} o de terceros que han
          autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
          reproducción, distribución, comunicación pública o transformación sin autorización expresa.
        </p>
        <p>
          Durante la vigencia del contrato, {OWNER.brand} concede al Cliente un derecho de uso no exclusivo e
          intransferible del sistema, limitado a su propio negocio. Los datos del restaurante y de sus comensales son
          titularidad del Cliente.
        </p>
      </S>

      <S n={14}>
        <p>
          {OWNER.brand} no garantiza la disponibilidad ininterrumpida de la web ni la ausencia de errores, aunque aplicará
          los medios razonables para evitarlos y corregirlos. No será responsable de los daños derivados del uso indebido
          de la web por parte de los usuarios.
        </p>
        <p>
          En la prestación del servicio, {OWNER.brand} se obliga a emplear la diligencia profesional exigible. Salvo en
          los casos de dolo o culpa grave, la responsabilidad total de {OWNER.brand} frente al Cliente quedará limitada al
          importe efectivamente abonado por el Cliente en los 12 meses anteriores al hecho que la origine, y no alcanzará
          al lucro cesante ni a los daños indirectos.
        </p>
        <p>
          Los sistemas de inteligencia artificial pueden cometer errores puntuales en la interpretación de llamadas o
          mensajes. El Cliente es responsable de revisar la información relevante de sus reservas y de comunicarnos
          cualquier incidencia para su corrección.
        </p>
      </S>

      <S n={15}>
        <p>
          El servicio se apoya en proveedores externos (telefonía, mensajería como WhatsApp, alojamiento e inteligencia
          artificial). {OWNER.brand} no es responsable de las interrupciones, cambios de condiciones o fallos atribuibles a
          dichos terceros, aunque colaborará para minimizar su impacto.
        </p>
        <p>
          La web puede contener enlaces a sitios de terceros. {OWNER.brand} no controla su contenido ni se responsabiliza
          de él; el acceso a ellos se realiza bajo la exclusiva responsabilidad del usuario.
        </p>
      </S>

      <S n={16}>
        <p>
          Ninguna de las partes será responsable del incumplimiento de sus obligaciones cuando se deba a causas de fuerza
          mayor o caso fortuito, como catástrofes naturales, cortes generalizados de suministro o de telecomunicaciones,
          ciberataques a gran escala o decisiones de la autoridad, mientras persistan dichas causas.
        </p>
      </S>

      <S n={17}>
        <p>Cualquiera de las partes podrá resolver el contrato, previa comunicación escrita, en caso de:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Incumplimiento grave de la otra parte que no se subsane en los 15 días siguientes a su notificación.</li>
          <li>Impago de dos o más mensualidades.</li>
          <li>Uso del servicio para fines ilícitos o contrarios a estas Condiciones.</li>
        </ul>
        <p>La resolución no afectará a las cantidades devengadas hasta la fecha.</p>
      </S>

      <S n={18}>
        <p>
          Ambas partes se comprometen a mantener la confidencialidad de la información que reciban de la otra con motivo
          de la relación contractual, incluida la información comercial y operativa del restaurante, y a no utilizarla con
          fines distintos a la prestación del servicio. Esta obligación se mantendrá tras la finalización del contrato.
        </p>
      </S>

      <S n={19}>
        <p>
          {OWNER.brand} puede modificar estas Condiciones para adaptarlas a cambios legales o en sus servicios. La versión
          vigente estará siempre publicada en esta página, con su fecha de actualización. Los cambios que afecten a
          Clientes con contrato en vigor se les comunicarán con al menos 30 días de antelación; si no están de acuerdo,
          podrán darse de baja antes de su entrada en vigor.
        </p>
      </S>

      <S n={20}>
        <p>
          Si alguna cláusula de estas Condiciones fuera declarada nula o inaplicable, total o parcialmente, el resto de las
          Condiciones mantendrá su validez y la cláusula afectada se sustituirá por otra válida que se ajuste lo más
          posible a su finalidad original.
        </p>
      </S>

      <S n={21}>
        <p>
          Estas Condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, y dado que
          los servicios se dirigen a profesionales, las partes se someten a los juzgados y tribunales de Granada,
          con renuncia a cualquier otro fuero que pudiera corresponderles, salvo que la ley disponga
          imperativamente otra cosa.
        </p>
        <p>
          Para cualquier duda sobre estas Condiciones puedes escribirnos a <Mail /> o llamarnos al {OWNER.phones}.
        </p>
      </S>
    </LegalLayout>
  )
}
