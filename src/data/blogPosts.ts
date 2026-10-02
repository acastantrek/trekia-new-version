import type { Picture } from 'vite-imagetools'
import operacionListaImage from '../assets/blog/operacion-lista-para-automatizarse.jpg'
import erpCrmImage from '../assets/blog/erp-crm-desconectados-coste-oculto.jpg'
import iaAplicadaImage from '../assets/blog/ia-aplicada-a-operaciones.jpg'
import dashboardImage from '../assets/blog/dashboard-en-el-que-nadie-confia.jpg'
import softwareMedidaImage from '../assets/blog/software-a-medida-o-low-code.jpg'
import costeRealImage from '../assets/blog/coste-real-de-un-proyecto-de-automatizacion.jpg'

export interface BlogPost {
  slug: string
  tag: string
  title: string
  excerpt: string
  /** Fecha para mostrar ("Septiembre 2026") */
  date: string
  /** La misma fecha en ISO 8601 (año-mes), para los datos estructurados */
  published: string
  image: Picture
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'operacion-lista-para-automatizarse',
    tag: 'Automatización',
    title: 'Cómo saber si tu operación está lista para automatizarse',
    excerpt:
      'Las señales más comunes: tareas repetitivas que dependen de una persona, hojas de cálculo que hacen de base de datos y decisiones que tardan días por falta de visibilidad.',
    date: 'Septiembre 2026',
    published: '2026-09',
    image: operacionListaImage,
    content: [
      'La mayoría de las empresas con las que trabajamos no llegan a nosotros preguntando por automatización. Llegan preguntando por qué un proceso que debería tardar minutos les sigue tardando días, o por qué dos personas del equipo dedican media jornada a tareas que ya deberían estar resueltas por el sistema.',
      'Hay tres señales que se repiten casi siempre. La primera es la dependencia de una persona concreta: si un proceso solo funciona porque alguien "lo tiene todo en la cabeza" o revisa manualmente cada paso, no es un proceso, es un punto único de fallo.',
      'La segunda es la hoja de cálculo que hace de base de datos. Cuando Excel se convierte en el sistema real de la operación —con fórmulas frágiles, pestañas que nadie recuerda para qué sirven y copias distintas circulando por correo— la empresa ya está pagando el coste de no tener una arquitectura de datos, aunque no lo vea reflejado en ninguna factura.',
      'La tercera es la decisión que tarda días por falta de visibilidad. Si para saber el estado real de un pedido, una incidencia o un cliente hay que preguntar a dos o tres personas y esperar respuesta, el problema no es de comunicación: es de que no existe una fuente única de verdad.',
      'Ninguna de estas señales se resuelve comprando más software. Se resuelve mapeando el proceso real, identificando dónde se pierde información al pasar de un sistema a otro, y automatizando exactamente esos puntos de fricción, en ese orden. Es el mismo enfoque que seguimos en nuestro método de trabajo.',
    ],
  },
  {
    slug: 'erp-crm-desconectados-coste-oculto',
    tag: 'Integraciones',
    title: 'ERP y CRM desconectados: el coste oculto de los datos duplicados',
    excerpt:
      'Cuando cada sistema tiene su propia versión de la verdad, el error no es de las personas, es de la arquitectura. Cómo detectarlo y por dónde empezar a resolverlo.',
    date: 'Agosto 2026',
    published: '2026-08',
    image: erpCrmImage,
    content: [
      'Es habitual encontrar empresas con un ERP para la gestión económica, un CRM para comercial y, entre medias, exportaciones manuales de Excel que alguien sube o descarga cada semana para que ambos "cuadren". El resultado casi nunca cuadra del todo.',
      'El síntoma más visible son los datos duplicados: un cliente con dos fichas distintas, un pedido que existe en un sistema pero no en el otro, un precio que se actualizó en uno y se olvidó en el otro. Cuando esto pasa, la reacción habitual es culpar a la persona que introdujo el dato. Pero el error casi nunca es humano: es que la arquitectura obliga a introducir el mismo dato dos veces en dos sitios distintos, y tarde o temprano alguien fallará.',
      'El coste real no es solo el tiempo de corregir duplicados. Es la desconfianza que genera: cuando comercial y administración manejan cifras distintas para la misma cuenta, cada reunión empieza discutiendo qué número es el correcto en lugar de discutiendo qué hacer con él.',
      'La solución no siempre es sustituir el ERP o el CRM. La mayoría de las veces basta con construir una integración que defina, con claridad, cuál sistema es la fuente de verdad para cada tipo de dato y sincronice el resto automáticamente, con reglas y alertas ante discrepancias.',
      'Detectarlo es sencillo: si alguien de tu equipo dedica tiempo cada semana a "cuadrar" información entre dos sistemas, ya tienes el caso de negocio hecho. El paso siguiente es diseñar la integración para que ese tiempo deje de existir.',
    ],
  },
  {
    slug: 'ia-aplicada-a-operaciones',
    tag: 'Inteligencia artificial',
    title: 'IA aplicada a operaciones: de la promesa al caso de uso real',
    excerpt:
      'La IA no soluciona un proceso mal diseñado, lo amplifica. Qué condiciones tiene que cumplir un flujo operativo antes de incorporar un modelo o un agente.',
    date: 'Julio 2026',
    published: '2026-07',
    image: iaAplicadaImage,
    content: [
      'La pregunta que más recibimos últimamente no es "qué puede hacer la IA", sino "dónde deberíamos aplicarla nosotros". Es la pregunta correcta, pero la respuesta casi nunca empieza por la tecnología.',
      'Un modelo o un agente de IA no arregla un proceso mal diseñado: lo amplifica. Si los datos de entrada son inconsistentes, si nadie tiene claro quién es responsable de una excepción, o si el proceso cambia de criterio según quién lo ejecute, automatizarlo con IA solo consigue que los errores ocurran más rápido y a mayor escala.',
      'Antes de incorporar un modelo, un flujo operativo necesita cumplir tres condiciones. La primera es tener datos mínimamente estructurados y accesibles: la IA necesita algo sobre lo que razonar. La segunda es tener un criterio de decisión explícito, aunque sea simple; si el propio equipo no puede explicar cómo decide, tampoco puede diseñarse un sistema que lo haga por ellos. La tercera es tener forma de medir el resultado, para saber si el modelo mejora el proceso o simplemente lo cambia.',
      'Cuando esas tres condiciones se cumplen, los casos de uso más rentables no suelen ser los más espectaculares. Clasificar y priorizar incidencias, extraer datos de documentos que hoy se leen a mano, o generar una primera propuesta de respuesta que una persona revisa antes de enviarla, generan más valor real que un chatbot genérico.',
      'El orden importa: primero el proceso, después los datos, y solo entonces el modelo. Es la misma lógica que aplicamos en cualquier proyecto de automatización, con o sin IA de por medio.',
    ],
  },
  {
    slug: 'dashboard-en-el-que-nadie-confia',
    tag: 'Dashboards y BI',
    title: 'Por qué un dashboard no sirve de nada si nadie confía en los datos',
    excerpt:
      'Muchas empresas ya tienen un panel de indicadores. Pocas lo usan para decidir. La diferencia casi nunca está en el diseño del dashboard, sino en lo que hay detrás.',
    date: 'Junio 2026',
    published: '2026-06',
    image: dashboardImage,
    content: [
      'Es habitual llegar a una empresa y encontrar un dashboard ya construido, a veces más de uno, que casi nadie mira. Cuando preguntamos por qué, la respuesta se repite: "esos números no son fiables" o "hay que preguntarle a alguien para saber si eso es verdad".',
      'Un dashboard es solo la última capa de una cadena. Si los datos que lo alimentan vienen de sistemas desconectados, con criterios distintos de lo que cuenta como "pedido cerrado" o "cliente activo" según quién lo introduce, el panel puede estar perfectamente diseñado y aun así ser inútil para decidir.',
      'Esto explica por qué invertir directamente en una herramienta de business intelligence rara vez resuelve el problema de fondo. La herramienta visualiza lo que le llega; no arbitra qué versión del dato es la correcta cuando dos sistemas no están de acuerdo.',
      'El trabajo que sí cambia las cosas ocurre antes del dashboard: definir una única fuente de verdad por cada indicador, automatizar la forma en que los datos llegan a ella y dejar el panel como la capa final, no como el proyecto en sí.',
      'Cuando ese trabajo previo existe, el dashboard deja de ser un informe bonito que se enseña una vez al mes y empieza a ser lo primero que alguien abre para decidir. Esa es la señal de que un proyecto de datos ha funcionado.',
    ],
  },
  {
    slug: 'software-a-medida-o-low-code',
    tag: 'Software a medida',
    title: 'Software a medida o low-code: cómo elegir sin equivocarte',
    excerpt:
      'No es una decisión ideológica. Depende de cuánto se parece tu proceso a los de cualquier otra empresa y de cuánto valor compite exactamente ahí.',
    date: 'Mayo 2026',
    published: '2026-05',
    image: softwareMedidaImage,
    content: [
      'Nos preguntan a menudo si conviene construir una herramienta a medida o resolver el problema con una plataforma low-code o un producto ya existente. La respuesta correcta casi nunca es una postura fija: depende de qué parte del proceso se está resolviendo.',
      'Cuando un proceso es prácticamente igual al de cualquier empresa del sector —gestión de gastos, firma de documentos, un CRM estándar— tiene poco sentido construirlo desde cero. Ya existen herramientas maduras, probadas por miles de empresas, que lo resuelven mejor y más barato que un desarrollo propio.',
      'La situación cambia cuando ese proceso es precisamente donde la empresa compite: una forma particular de asignar rutas de reparto, un criterio propio de priorización de incidencias, una manera de combinar datos de producción que nadie más tiene. Ahí, forzar la operación a encajar en los límites de una herramienta genérica no ahorra dinero, lo cuesta, porque la empresa termina trabajando para el software en lugar de que el software trabaje para ella.',
      'El low-code ocupa un espacio intermedio útil: permite construir algo específico sin asumir todo el coste de un desarrollo desde cero, siempre que la lógica no sea demasiado compleja ni cambie con demasiada frecuencia. Es una herramienta más, no una filosofía a defender en todos los casos.',
      'La pregunta que de verdad ayuda a decidir no es "a medida o no a medida", sino "¿esta parte del proceso es donde competimos, o es una función de soporte que ya resolvió el mercado?". La respuesta suele ser bastante clara en cuanto se formula así.',
    ],
  },
  {
    slug: 'coste-real-de-un-proyecto-de-automatizacion',
    tag: 'Modelo económico',
    title: 'El coste real de un proyecto de automatización (y cómo evitar sorpresas)',
    excerpt:
      'La mayoría de los sobrecostes no vienen del desarrollo, sino de alcance mal definido y de integraciones que aparecen a mitad de proyecto. Cómo anticiparlos.',
    date: 'Abril 2026',
    published: '2026-04',
    image: costeRealImage,
    content: [
      'Cuando un proyecto de automatización se dispara en coste, casi nunca es porque el desarrollo en sí fue más caro de lo previsto. Es porque el alcance inicial no incluía piezas que resultaron imprescindibles: una integración con un sistema que nadie mencionó en la primera reunión, un caso excepcional que representa el 20% de los casos reales, un requisito legal que aparece al llegar a producción.',
      'Por eso el primer paso de cualquier proyecto serio no es presupuestar, es diagnosticar: mapear el proceso tal como ocurre de verdad, no como se describe en la reunión inicial, y hacerlo antes de comprometer una cifra cerrada.',
      'El segundo error habitual es tratar el proyecto como un gasto único. Un flujo automatizado necesita infraestructura, monitorización y soporte para seguir funcionando, igual que cualquier sistema en producción. Presupuestar solo el "arranque" y descubrir la cuota de operación más adelante genera la sensación de sorpresa, aunque el coste siempre estuvo ahí.',
      'El tercer factor es la evolución. Los procesos cambian: un nuevo canal de venta, un cambio normativo, un ERP que se sustituye. Un proyecto bien planteado separa con claridad qué cuesta el arranque, qué cuesta mantenerlo funcionando y qué cuesta ampliarlo, en lugar de mezclar los tres en una única cifra que nadie sabe explicar después.',
      'Cuando esa separación existe desde el principio, el proyecto deja de sentirse como una caja negra y se convierte en algo que la empresa puede planificar, presupuestar y decidir con la misma lógica que cualquier otra inversión operativa.',
    ],
  },
]
