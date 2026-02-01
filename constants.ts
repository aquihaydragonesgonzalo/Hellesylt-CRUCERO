import { Activity, AudioTrack, Pronunciation, Coordinate } from './types';

export const SHIP_DEPARTURE_TIME = "21:00";
export const ARRIVAL_TIME = "09:00";
export const ONBOARD_TIME = "20:30";
export const UPDATE_DATE = "09 de diciembre de 2025";

export const COORDS = {
    HELLESYLT_CRUISE_DOCK: { lat: 62.085348, lng: 6.873744 },
    HELLESYLT_FERRY_DOCK: { lat: 62.087367, lng: 6.869952 },
    HELLESYLT_WATERFALL: { lat: 62.086675, lng: 6.865685 },
    GEIRANGER_FERRY_DOCK: { lat: 62.103568, lng: 7.202824 },
    SEVEN_SISTERS: { lat: 62.106854, lng: 7.093885 },
    FLYDAL: { lat: 62.091142, lng: 7.223091 },
    ORNESVINGEN: { lat: 62.126299, lng: 7.167320 },
    STORFOSSEN_START: { lat: 62.098041, lng: 7.204759 },
    FOSSEVANDRING_VIEW: { lat: 62.097005, lng: 7.209251 }
};

export const INITIAL_ITINERARY: Activity[] = [
    {
        id: '0', title: 'Desayuno Buffet MSC', startTime: '08:00', endTime: '08:30',
        locationName: 'MSC Euribia', coords: COORDS.HELLESYLT_CRUISE_DOCK,
        description: 'Desayuno en el Buffet del MSC EURIBIA.',
        fullDescription: 'Disfruta del desayuno buffet en el MSC Euribia. Es importante comer bien antes de iniciar la excursión de día completo.',
        tips: 'El buffet suele estar concurrido, ve con tiempo.',
        keyDetails: 'Buffet MSC.',
        priceNOK: 0, priceEUR: 0, type: 'food', completed: false
    },
    {
        id: '1', title: 'Llegada a Hellesylt', startTime: '09:00', endTime: '09:00',
        locationName: 'Muelle Crucero MSC', coords: COORDS.HELLESYLT_CRUISE_DOCK,
        description: 'Llegada al puerto de Hellesylt.',
        fullDescription: 'Llegada al puerto de Hellesylt. El barco atraca en el muelle de cruceros (Hellesylt Cruise Quay).',
        tips: 'Disfruta del entorno tranquilo antes de iniciar las actividades. Ubica el muelle del Ferry que está a unos minutos caminando.',
        keyDetails: 'Llegada 09:00.',
        priceNOK: 0, priceEUR: 0, type: 'logistics', completed: false,
        instagramUrl: 'https://www.instagram.com/explore/tags/hellesylt/'
    },
    {
        id: '2', title: 'Descubriendo Hellesylt', startTime: '09:30', endTime: '10:45',
        locationName: 'Cascada Hellesylt', coords: COORDS.HELLESYLT_WATERFALL,
        description: 'Paseo matinal y cascada.',
        fullDescription: 'Disfruta del entorno. La cascada de Hellesylt cae directamente al fiordo y está a pocos metros del muelle del Ferry.',
        tips: 'Prioridad Baja Movilidad: La cascada se ve genial desde el puente junto al Grand Hotel.',
        keyDetails: 'Cascada impresionante.',
        priceNOK: 0, priceEUR: 0, type: 'sightseeing', completed: false,
        webcamUrl: 'https://www.youtube.com/live/S4aJlRY39fo?si=35XxdvEMmIpv4Ea4', 
        instagramUrl: 'https://www.instagram.com/explore/tags/hellesyltfossen/',
        hasAudioGuide: true
    },
    {
        id: '3', title: 'Embarque Ferry (IDA)', startTime: '10:45', endTime: '11:00',
        locationName: 'Muelle Ferry', coords: COORDS.HELLESYLT_FERRY_DOCK,
        description: 'Prepárate para embarcar.',
        fullDescription: 'Dirígete al muelle del ferry (distinto al del crucero). Muestra tu ticket de norwaysbest.com. Asegúrate de estar en la cola correcta.',
        tips: 'Ten los tickets digitales o impresos a mano.',
        keyDetails: 'Salida puntual 11:00.',
        priceNOK: 0, priceEUR: 0, type: 'logistics', completed: false,
        ticketUrl: 'https://www.norwaysbest.com/es/geiranger/actividades/crucero-por-el-fiordo-geiranger'
    },
    {
        id: '4', title: 'Navegación a Geiranger', startTime: '11:00', endTime: '12:05',
        locationName: 'Fiordo Geiranger', endLocationName: 'Puerto Geiranger',
        coords: COORDS.HELLESYLT_FERRY_DOCK, endCoords: COORDS.GEIRANGER_FERRY_DOCK,
        description: 'Crucero por el fiordo UNESCO.',
        fullDescription: 'Trayecto espectacular de Hellesylt a Geiranger. Pasarás por las famosas cascadas de las Siete Hermanas (Seven Sisters), el Pretendiente y el Velo de la Novia.',
        tips: 'Usa este tiempo para fotos de las cascadas desde el barco. La mejor vista de las 7 Hermanas es desde el agua.',
        keyDetails: 'Duración 1h 05m.',
        priceNOK: 585, priceEUR: 50, type: 'transport', completed: false,
        instagramUrl: 'https://www.instagram.com/explore/tags/geirangerfjord/',
        hasAudioGuide: true
    },
    {
        id: '5', title: 'Llegada y Almuerzo Rápido', startTime: '12:05', endTime: '12:45',
        locationName: 'Puerto Geiranger', coords: COORDS.GEIRANGER_FERRY_DOCK,
        description: 'Desembarque y preparación para bus.',
        fullDescription: 'Dirígete directamente a la parada del Bus Panorámico (suele estar justo en el puerto o al lado del centro de información). Come algo rápido para aprovechar el tiempo.',
        tips: 'Localiza la parada del bus nada más bajar para no correr luego.',
        keyDetails: 'Parada Bus cercana.',
        priceNOK: 0, priceEUR: 0, type: 'food', completed: false,
        webcamUrl: 'https://www.youtube.com/live/kRbPEg89tjA?si=6jGdBWjM964b-mg6'
    },
    {
        id: '6', title: 'Tour Panorámico BUS', startTime: '12:45', endTime: '14:15',
        locationName: 'Geiranger', endLocationName: 'Miradores',
        coords: COORDS.GEIRANGER_FERRY_DOCK, endCoords: COORDS.FLYDAL,
        description: 'Flydalsjuvet y Ørnesvingen.',
        fullDescription: '¡La mejor vista! El bus sube a los puntos más icónicos: Flydalsjuvet (la foto clásica del fiordo) y Ørnesvingen (la carretera de las Águilas).',
        tips: 'Accesibilidad: El tour es ideal para evitar escaleras. Las paradas de 10 min en miradores suelen tener plataformas accesibles.',
        keyDetails: 'Tour 1.5 horas.',
        priceNOK: 550, priceEUR: 47, type: 'sightseeing', completed: false,
        ticketUrl: 'https://www.geirangerfjord.no/panoramic-bus-geiranger-4',
        instagramUrl: 'https://www.instagram.com/explore/tags/flydalsjuvet/',
        hasAudioGuide: true
    },
    {
        id: '7', title: 'Almuerzo Relax Geiranger', startTime: '14:15', endTime: '16:00',
        locationName: 'Geiranger Centro', coords: COORDS.GEIRANGER_FERRY_DOCK,
        description: 'Comida tranquila con vistas.',
        fullDescription: 'Disfruta de una comida tranquila en Geiranger. Hay restaurantes con terraza cerca del fiordo.',
        tips: 'Relájate después del bus. Prueba el salmón local.',
        keyDetails: 'Tiempo libre.',
        priceNOK: 350, priceEUR: 30, type: 'food', completed: false,
        instagramUrl: 'https://www.instagram.com/explore/tags/geiranger/'
    },
    {
        id: '8', title: 'Visita Cultural / Paseo', startTime: '16:00', endTime: '18:00',
        locationName: 'Fossevandring', coords: COORDS.FOSSEVANDRING_VIEW,
        description: 'Waterfall Walk o Compras.',
        fullDescription: 'Opción Activa: Sube por el sendero "Fossevandring" (Waterfall Walk) junto a la cascada Storfossen. Opción Relax: Paseo por el puerto.',
        tips: 'El Waterfall Walk tiene escaleras (327 escalones) pero vistas increíbles. Inicia cerca del Hotel Union o desde el puerto subiendo.',
        keyDetails: '2 horas libres.',
        priceNOK: 0, priceEUR: 0, type: 'sightseeing', completed: false,
        instagramUrl: 'https://www.instagram.com/explore/tags/fossevandring/',
        hasAudioGuide: true
    },
    {
        id: '9', title: 'Embarque Ferry (VUELTA)', startTime: '18:00', endTime: '18:30',
        locationName: 'Muelle Geiranger', coords: COORDS.GEIRANGER_FERRY_DOCK,
        description: 'Regreso a Hellesylt.',
        fullDescription: 'Dirígete al muelle para tomar el ferry de vuelta.',
        tips: 'La luz de la tarde (18:30) es ideal para fotografiar los acantilados y granjas abandonadas con iluminación lateral.',
        keyDetails: 'Salida 18:30.',
        priceNOK: 0, priceEUR: 0, type: 'logistics', completed: false
    },
    {
        id: '10', title: 'Navegación de Regreso', startTime: '18:30', endTime: '19:35',
        locationName: 'Fiordo', endLocationName: 'Hellesylt',
        coords: COORDS.GEIRANGER_FERRY_DOCK, endCoords: COORDS.HELLESYLT_FERRY_DOCK,
        description: 'Ferry Geiranger -> Hellesylt.',
        fullDescription: 'Disfruta del viaje de vuelta con una perspectiva diferente y luz de atardecer.',
        tips: 'Relájate en cubierta.',
        keyDetails: 'Llegada 19:35.',
        priceNOK: 0, priceEUR: 0, type: 'transport', completed: false,
        hasAudioGuide: true
    },
    {
        id: '11', title: 'Llegada y Tiempo Libre', startTime: '19:35', endTime: '20:30',
        locationName: 'Hellesylt', coords: COORDS.HELLESYLT_CRUISE_DOCK,
        description: 'Llegada a Hellesylt y tiempo libre.',
        fullDescription: 'Llegada del ferry de vuelta. Tiempo libre para pasear o volver al barco.',
        tips: 'Mantente cerca del muelle de cruceros.',
        keyDetails: 'Hasta 20:30.',
        priceNOK: 0, priceEUR: 0, type: 'sightseeing', completed: false
    },
    {
        id: '12', title: '¡TODOS A BORDO!', startTime: '20:30', endTime: '20:30',
        locationName: 'Muelle Crucero MSC', coords: COORDS.HELLESYLT_CRUISE_DOCK,
        description: 'Hora límite para embarcar.',
        fullDescription: 'Todos los pasajeros deben estar a bordo. Hora límite 20:30.',
        tips: 'Sube al barco con antelación.',
        keyDetails: 'LÍMITE 20:30.',
        priceNOK: 0, priceEUR: 0, type: 'logistics', completed: false, notes: 'CRITICAL'
    },
    {
        id: '13', title: 'ZARPAMOS', startTime: '21:00', endTime: '21:00',
        locationName: 'Fiordo', coords: COORDS.HELLESYLT_CRUISE_DOCK,
        description: 'Salida del MSC Euribia.',
        fullDescription: 'El barco zarpa hacia el siguiente destino. Despedida de Hellesylt.',
        tips: 'Sube a cubierta para las vistas de despedida.',
        keyDetails: 'Salida 21:00.',
        priceNOK: 0, priceEUR: 0, type: 'transport', completed: false
    }
];

export const HELLESYLT_AUDIO_TRACKS: AudioTrack[] = [
    {
        id: 1,
        title: "1. La Llegada al Fiordo",
        text: "¡Bienvenidos a Hellesylt! Si estás escuchando esto, es porque ya estás en cubierta respirando uno de los aires más puros de Europa. Mira a tu alrededor. Estamos al final del Sunnylvsfjorden, un brazo lateral del gran Storfjord. ¿Notas la diferencia con otros puertos? Aquí no hay grandes terminales de cemento ni ruido de ciudad. Hellesylt es un puerto natural que ha sido utilizado desde la Era Vikinga. Hace mil años, los barcos no eran cruceros de acero, sino drakkars de madera que buscaban refugio en estas aguas tranquilas de color esmeralda. Este pequeño pueblo, de apenas 300 habitantes, vive en un equilibrio perfecto. Las montañas que ves alzarse casi verticalmente sobre nosotros actúan como murallas protectoras, resguardando el valle del clima más duro del océano. Tómate un momento antes de bajar. Mira el reflejo de los picos en el agua. Estás a punto de pisar un lugar donde la naturaleza sigue siendo la dueña absoluta."
    },
    {
        id: 2,
        title: "2. La Gran Cascada",
        text: "Ahora, busca el movimiento. Dirige tu vista hacia el centro del pueblo, justo entre las casas. ¿Lo ves? Esa es la Hellesyltfossen. Es el corazón, literalmente rugiente, de Hellesylt. Es muy raro ver una cascada de este caudal atravesando el centro mismo de una población. El agua que ves caer con esa fuerza blanca y espumosa viene del deshielo de los glaciares y las nieves altas. Cae sobre lechos de granito pulido por siglos de erosión y termina su viaje justo aquí, bajo nuestro barco. Aquí va el secreto para tu visita: Cuando bajes a tierra, verás un viejo puente que cruza la cascada por la mitad. Tienes que ir allí. No te conformes con verlo desde lejos. Al pararte en ese puente, sentirás la bruma fría en la cara y el estruendo del agua te impedirá hablar. Es una sensación de poder increíble. Además, desde ese puente, con el fiordo y nuestro barco de fondo, tendrás la mejor fotografía de todo el crucero."
    },
    {
        id: 3,
        title: "3. Arquitectura y Vida Local",
        text: "Mientras caminas por el muelle, fíjate en las construcciones. Estás viendo la arquitectura clásica de los fiordos occidentales. Casas de madera, techos a dos aguas preparados para soportar toneladas de nieve en invierno, y esos colores característicos: Rojo óxido, que antiguamente era la pintura más barata hecha con sangre de pescado y aceite; Amarillo ocre, y Blanco, que solía ser símbolo de riqueza. Si tienes tiempo para caminar un poco más, busca la Iglesia de Sunnylven. Es ese edificio de madera que vigila el fiordo desde 1859. Si la encuentras abierta, entra. El olor a madera antigua y el silencio en su interior son un bálsamo para el alma. Hellesylt no es un lugar de grandes monumentos de piedra, es un lugar de madera, agua y resistencia humana frente al clima."
    },
    {
        id: 4,
        title: "4. Despedida y El Camino",
        text: "Para terminar, una nota curiosa sobre nuestra ubicación. Hellesylt es conocida como la 'Puerta de Entrada'. Muchos viajeros desembarcan aquí para tomar la ruta terrestre hacia el famoso fiordo de Geiranger. Si vas a hacer esa excursión, prepárate para ver el lago más profundo de Europa en el camino. Pero si te quedas aquí, en Hellesylt, disfruta del lujo del tiempo. Siéntate en un banco frente al agua. Observa cómo cambia la luz sobre las montañas cada diez minutos. Aquí, el espectáculo no lo pone el hombre, lo pone el cielo. Disfruta de tu escala en Hellesylt. Camina despacio, respira hondo y llévate este paisaje grabado en la retina. Nos vemos al regreso a bordo."
    },
    {
        id: 5,
        title: "BONUS: Leyendas Ocultas",
        text: "Gigantes de Piedra: Mirad esas montañas de nuevo... Pero esta vez, no busquéis picos ni nieve. Buscad caras. Buscad narices deformes en la roca. La mitología noruega nos dice que el paisaje que os rodea no es geología... es un cementerio de Trolls. Cuenta la leyenda que estas inmensas paredes de granito eran, hace miles de años, gigantes que gobernaban la noche. Eran seres poderosos pero lentos de pensamiento. Una noche, discutiendo o persiguiendo a alguna doncella, perdieron la noción del tiempo. Y aquí, la regla es sagrada: si el sol te toca, te conviertes en piedra para siempre. La Huldra: Pero los Trolls no son lo único. Si decidís caminar cerca de la cascada o senderos boscosos, cuidado si escucháis una melodía hermosa. Podría ser la Huldra. Una criatura del bosque, increíblemente bella, que seduce a viajeros solitarios. Su secreto: tiene cola de vaca. Si os cruzáis con ella, no os asustéis, saludad con respeto y seguid vuestro camino. Y recordad: en Noruega decimos que la naturaleza está viva. Aquí somos invitados en el hogar de los gigantes."
    }
];

export const GEIRANGER_FERRY_AUDIO_TRACKS: AudioTrack[] = [
    {
        id: 1,
        title: "1. La Inmersión en el Fiordo",
        text: "Viajeros, mientras el ferry se aleja de Hellesylt, estamos entrando oficialmente en el corazón de la Noruega de los fiordos. El cuerpo de agua en el que nos adentramos ahora es el Geirangerfjord. No es un fiordo cualquiera: desde 2005, es reconocido por la UNESCO como Patrimonio de la Humanidad, un honor que comparte por su belleza prístina e inalterada. Miren las paredes que nos rodean. Son montañas que se hunden cientos de metros bajo el nivel del mar. La profundidad aquí es asombrosa, y sin embargo, el agua es tan quieta y clara que a menudo parece que estamos navegando sobre un espejo. Prepárense. Lo que van a ver en los próximos 60 minutos es una sinfonía de agua y roca. La mayor parte de los puntos de interés estarán a babor (lado izquierdo) o a estribor (lado derecho) del ferry. Les avisaré en cada momento."
    },
    {
        id: 2,
        title: "2. El Velo de la Novia (Brudesløret)",
        text: "Miren ahora hacia Babor, nuestro lado izquierdo. La primera estrella del espectáculo es la cascada Brudesløret, o El Velo de la Novia. Fíjense bien: su caída es amplia, pero la fuerza del viento y la roca hace que el agua se disperse antes de tocar el fiordo. Parece una capa de tul blanco, delgada y etérea, deslizándose sobre la roca oscura. De ahí su nombre. Cae desde una altura de unos 300 metros, y en días de sol, pueden capturar un arcoíris muy especial en su bruma. Es una de las cascadas más elegantes de Noruega. Es un anuncio de lo que está por venir. Aguanten la respiración, porque el plato fuerte nos espera justo después de la próxima curva."
    },
    {
        id: 3,
        title: "3. Las Siete Hermanas",
        text: "Ahora sí. Mirad hacia Estribor, nuestro lado derecho. Lo que ven es majestuoso: Las Siete Hermanas, o De syv søstrene. Es la cascada más fotografiada de todo el fiordo. La leyenda dice que son siete hermosas hermanas que bailan en la montaña. Aunque la nieve o la lluvia determinen si vemos las siete en su máximo esplendor, la roca tallada les dará una idea de su magnitud. En primavera, o después de días de lluvia, sus siete chorros caen con tal fuerza que la bruma parece elevarse hasta el cielo. Es una historia de amor no correspondido la que le da vida a este trío de cascadas. Dice la leyenda que estas siete hermanas atrajeron la atención de un soltero muy persistente... que se encuentra justo enfrente de ellas."
    },
    {
        id: 4,
        title: "4. El Pretendiente (Friaren)",
        text: "Giren 180 grados y miren directamente al frente de las Siete Hermanas, hacia Babor. Ahí tenéis al otro protagonista: El Pretendiente, o Friaren. Es una cascada que cae de forma irregular, con una roca saliente en la mitad que le da una forma que la gente local bromea al decir que se parece a una botella de aguardiente. La leyenda cuenta que El Pretendiente, borracho o no, intentó cortejar a cada una de las siete hermanas, pero fue rechazado por todas. Desde entonces, ha quedado petrificado y con el corazón roto justo enfrente de ellas, incapaz de apartar la mirada. Es un guiño divertido a la historia del fiordo. Este es el momento de sacar vuestra cámara. La vista de Las Siete Hermanas y El Pretendiente enfrentados a través del fiordo es la postal más icónica de vuestro viaje."
    },
    {
        id: 5,
        title: "5. La Granja Skageflå y la Llegada",
        text: "Mientras el ferry se dirige a su destino final, quiero que miren hacia Estribor de nuevo, hacia las alturas. Justo en ese pequeño saliente, a cientos de metros sobre el agua, verán lo que parece un punto de color en el acantilado. Esa es la granja abandonada Skageflå. Es una de las muchas granjas de montaña (fjordgårder) que un día estuvieron habitadas, accesibles solo por escaleras de madera o por barco. Vivir aquí era duro y peligroso; la gente ataba a sus hijos a cuerdas para que no cayeran al fiordo. Es un testamento a la tenacidad del pueblo noruego. Y ahora, el fiordo comienza a cerrarse. Delante de nosotros, en el valle, se revela el pequeño pueblo de Geiranger. Prepárense para desembarcar. Han navegado por uno de los lugares más bellos del planeta. Disfruten su tiempo en Geiranger. Tusen takk! ¡Muchas gracias!"
    }
];

export const GEIRANGER_BUS_AUDIO_TRACKS: AudioTrack[] = [
    {
        id: 1,
        title: "1. Los Miradores (Flydalsjuvet y Ørnesvingen)",
        text: "Para entender realmente la magnitud de este lugar, tienen que elevarse. El pueblo es hermoso, pero las vistas que han hecho famoso a Geiranger se disfrutan desde la carretera. Hay tres miradores principales, y si tenéis tiempo, intentad visitar al menos dos: 1. Flydalsjuvet (El Desfiladero de Flydal): Es el más famoso para la foto clásica de postal. Hay una plataforma moderna y una roca saliente donde obtendrán la foto perfecta del fiordo con nuestro barco anclado. Es relativamente fácil de acceder. 2. Ørnesvingen (El Nido del Águila): Este mirador se encuentra en la carretera que asciende desde el pueblo (la carretera del Águila) y ofrece una vista espectacular del fiordo abierto, con el Pretendiente y las Siete Hermanas visibles desde arriba. Es una vista impresionante al salir de Geiranger."
    }
];

export const GEIRANGER_VILLAGE_AUDIO_TRACKS: AudioTrack[] = [
    {
        id: 1,
        title: "1. El Final del Fiordo y el Color Turquesa",
        text: "¡Bienvenidos a Geiranger! Siéntanse libres de estirar las piernas. Han llegado al punto final del fiordo, el valle que le da nombre. Miren el paisaje: es un anfiteatro natural donde las montañas se elevan en 360 grados a nuestro alrededor. Lo primero que deben notar es el color del agua aquí en la orilla. ¿Ven ese tono azul turquesa lechoso? Ese color se debe al limo glaciar. El río Geirangelva, que corre desde las montañas, arrastra consigo partículas finísimas de roca que han sido molidas por el movimiento del hielo. Este material refleja la luz de una manera única, dándole al agua ese brillo irreal. Geiranger es pequeño, pintoresco y totalmente dedicado a la experiencia del fiordo. Recuerden: están en el corazón mismo de un sitio Patrimonio Mundial de la UNESCO."
    },
    {
        id: 2,
        title: "2. El Corazón del Pueblo",
        text: "El pueblo de Geiranger es muy fácil de recorrer a pie. Su centro de actividad se concentra en un par de hoteles y el muelle principal. Les recomiendo dar un paseo por la zona de las tiendas de recuerdos, pero hay dos paradas obligatorias que le dan sabor al lugar: 1. La Iglesia de Geiranger: Es una iglesia octogonal de madera, muy encantadora y representativa de la zona, construida en 1842. 2. Geiranger Sjokolade (Chocolate): Si eres amante del dulce, no te puedes perder la tienda de chocolate local. Es famosa por sus bombones hechos a mano que utilizan ingredientes locales, como el queso brunost o incluso hierbas del fiordo. Disfruten de la atmósfera tranquila y del olor a pino y agua salada antes de que subamos a las alturas."
    },
    {
        id: 3,
        title: "3. El Sendero Acuático: FOSSEVANDRING",
        text: "Si buscan una experiencia inmersiva que ponga a prueba sus pulmones, no busquen más allá del Fossevandring, o 'El Paseo de la Cascada'. Este sendero comienza justo aquí, en el puerto. Sigan la orilla del río Geirangelva, que se precipita sobre la cascada Storfossen (La Gran Cascada). El Fossevandring es una maravilla de ingeniería y diseño escénico. Es un camino de más de 300 escalones y pasarelas de acero que asciende por el lateral del desfiladero, permitiéndoles experimentar la fuerza de la cascada a centímetros de distancia. No es una caminata fácil, ¡pero es corta y vale la pena! Tomen su tiempo y deténganse en los puentes panorámicos. Sentirán el temblor de la roca y la bruma húmeda en la cara. Es el mejor lugar para fotografiar la energía pura del agua. Una vez que lleguen a la cima, habrán superado los 327 escalones y serán recompensados con la llegada al Centro Noruego del Fiordo (Norsk Fjordsenter), un excelente lugar para aprender sobre la vida y la geología del Geirangerfjord. ¡Es un 'dos por uno' perfecto!"
    }
];

export const GEIRANGER_DEPARTURE_AUDIO_TRACKS: AudioTrack[] = [
    {
        id: 1,
        title: "1. La Despedida de Geiranger",
        text: "Ya sea que decidas pasear tranquilamente junto al río o ascender a las alturas, recuerda la fuerza natural que creó este lugar. Geiranger es una obra de arte esculpida por el hielo y el agua durante la última Era Glacial. Es un lugar que nos invita a la reflexión y al asombro. Cuando sea hora de volver a embarcar, mira una vez más el color turquesa del agua. Es el 'polvo de estrellas' de los glaciares, la prueba tangible de la magia de Noruega. Que disfrutes tu tiempo. Y como decimos en Noruega, Ha det bra! ¡Que te vaya bien!"
    }
];

export const PRONUNCIATIONS: Pronunciation[] = [
    { word: 'Hellesylt', phonetic: '/hɛləsʏlt/', simplified: 'HE-le-sült', meaning: 'Meseta sagrada' },
    { word: 'Geiranger', phonetic: '/gɛɪrɑŋər/', simplified: 'GAY-rang-er', meaning: 'Fiordo de la lanza' },
    { word: 'Flydalsjuvet', phonetic: '/flyːdɑlsjʉːvət/', simplified: 'FLÜ-dals-iu-vet', meaning: 'Garganta de Flydal' },
    { word: 'Ørnesvingen', phonetic: '/œrnsvɪŋən/', simplified: 'ERN-sving-en', meaning: 'Curva del Águila' },
    { word: 'Fjord', phonetic: '/fjɔːr/', simplified: 'FIURD', meaning: 'Fiordo' },
    { word: 'Foss', phonetic: '/fɔs/', simplified: 'FOS', meaning: 'Cascada' },
    { word: 'Takk', phonetic: '/tak/', simplified: 'TAK', meaning: 'Gracias' },
];