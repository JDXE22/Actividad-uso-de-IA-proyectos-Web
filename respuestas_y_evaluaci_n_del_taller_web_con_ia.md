## 1. Actividad 1: Brief del Proyecto (Las Cuatro Preguntas Fundamentales)

### 1. Propósito

- **Objetivo de negocio:** Diseñar y maquetar una solución web comercial enfocada en la venta directa y visual de pizzas artesanales elaboradas con masa madre.
- **Modelo operativo:** Canalizar pedidos inmediatos ítem por ítem bajo las modalidades exclusivas de **entrega a domicilio (delivery)** y **recogida en local (takeout)**.
- **Conversión:** Facilitar la compra rápida sin registro previo obligatorio, permitiendo seleccionar producto, tamaño y despacho en pesos colombianos (COP).

### 2. Audiencia

- **Perfil principal:** Clientes adultos (jóvenes y mayores de edad), consumidores recurrentes y nuevos clientes que buscan una opción de comida rápida.
- **Segmentación:**
  - _Consumo al detalle:_ Personas individuales, parejas o familias.
  - _Consumo al por mayor:_ Clientes corporativos y organizadores de reuniones/eventos que requieren pedidos por volumen.
- **Entorno técnico:** Usuarios que acceden prioritariamente desde teléfonos inteligentes en redes móviles, demandando tiempos de carga reducidos, legibilidad inmediata y áreas táctiles confortables.

### 3. Contenido y Secciones

- **Cabecera (`<header>`):** Logotipo de marca, enlace de salto rápido (`skip-link`) y navegación fija con menú móvil accesible.
- **Home / Hero (`<section id="home">`):** Banner inmersivo con fotografía del exterior del negocio, lema comercial, diferenciador de masa madre y llamada a la acción principal hacia el catálogo.
- **About / Operación (`<section id="about">`):** Tarjetas informativas con horarios continuos, dirección del punto de horneado y aclaración expresa de servicio sin reserva de mesas físicas.
- **Products / Catálogo (`<section id="products">`):** Catálogo de 4 especialidades (Pizza Napolitana, Carne, Pollo y Vegetariana), selector interactivo de tamaño (Personal, Mediana, Familiar), cálculo dinámico de precio en COP y filtros por popularidad, precio y disponibilidad.
- **Contact & Feedback (`<section id="contact">`):** Canales de atención telefónica directa (`tel:`), enlace a WhatsApp y formulario estructurado con validación accesible.
- **Footer (`<footer>`):** Información legal básica, modalidades y enlace para volver al inicio.

### 4. Estética

- **Atmósfera:** Moderna, nocturna y urbana, basada en una armonía análoga de colores oscuros, púrpuras y azules intensos.
- **Paleta cromática (HEX):**
  - Fondo General: `#0F0C20` (Dark Aubergine).
  - Superficies y Tarjetas: `#1E1838` (Deep Violet Surface).
  - Color Primario (CTA y Acentos): `#8B5CF6` (Electric Purple).
  - Color Secundario (Estados y badges): `#2563EB` (Cobalt Blue).
  - Destacado (Mejor Review): `#F59E0B` (Amber Gold).
  - Texto de Alto Contraste: `#F8FAFC` (Pure Mist) y `#C4B5FD` (Lavender).
- **Tipografía y ritmo visual:** `Helvetica, Arial, sans-serif`, interlineado base estricto de `1.5rem` para maximizar confort de lectura en pantallas OLED/LCD y bordes redondeados (`12px`) con microinteracciones de foco accesible (`#38BDF8`).

---

## 2. Actividad 2: Priming y Preparación del Contexto

### Preguntas de Análisis y Reflexión

#### ¿El contexto inicial delimitó correctamente el rol y las tecnologías?

**Respuesta:**  
Sí delimitó las fronteras técnicas esenciales al establecer el rol de _Desarrollador Frontend Senior_ y vetar el uso de librerías o frameworks (Bootstrap, Tailwind, React), forzando el uso exclusivo de HTML semántico, CSS moderno y JavaScript puro en archivos independientes. Sin embargo, no delimitó completamente el alcance operativo inicial: funcionó como una guía de intenciones técnicas y scaffolding arquitectónico, pero dejó variables abiertas de negocio que requerían una segunda capa de contexto específico.

#### ¿Qué ambigüedades siguen pendientes?

**Respuesta:**

1. Los valores numéricos exactos de las pizzas y la convención monetaria oficial (resuelto posteriormente como `$ COP`).
2. El volumen específico de productos en el catálogo inicial (definido luego en 4 ítems puntuales).
3. El comportamiento del flujo de compra: definir si se requería un carrito acumulativo complejo o una orden directa e inmediata ítem por ítem.
4. La política de atención en local (se aclaró que opera exclusivamente por entrega a domicilio o recogida en puerta, sin reserva de mesas).

#### ¿Qué sucedería si cambiaras el propósito o el tipo de usuario sin actualizar el contexto?

**Respuesta:**  
Se produciría un fenómeno de **desalineación contextual (_context drift_) y alucinación funcional**. La IA comenzaría a asumir patrones por defecto que contradicen los requerimientos: por ejemplo, diseñaría un sistema de reservas de mesas físicas para cenas elegantes, integraría pasarelas de pago con tarjeta de crédito de terceros o cambiaría la paleta a tonos claros diurnos, rompiendo la ergonomía táctil móvil y la coherencia con clientes mayoristas y minoristas nocturnos.

---

## 3. Actividad 3: Meta-prompting

### Preguntas de Análisis y Reflexión

#### ¿Qué información importante surgió al aplicar Meta-prompting?

**Respuesta:**

- **Estructuración paramétrica:** Evidenció la importancia de solicitar a la IA una plantilla organizada por campos antes de generar código, obligando a desglosar: Identidad Visual, Arquitectura de Información, Accesibilidad (WCAG), Interacciones en JS, Carga Multimedia y Breakpoints.
- **Detección temprana de vacíos:** Hizo visible que en el brief inicial faltaban los ratios de contraste cromático verificables, la política de redimensionamiento de contenedores de imagen (`aspect-ratio`) para prevenir saltos visuales (_CLS_), y la definición del comportamiento del foco accesible (`:focus-visible`).
- **Separación de fases:** Estableció una barrera de calidad estricta donde la fase de diseño conceptual y validación lógica debe ser aprobada antes de escribir una sola línea de HTML, CSS o JavaScript.

---

## 4. Actividad 4: Experimentación con Cuatro Técnicas de Prompting

### Reto 1. Zero-shot: Crear sin Ejemplos

- **Prompt ejecutado:** Solicitud de la propuesta visual sin aportar ningún ejemplo de referencia previo.
- **¿Qué decisiones tomó la IA por su cuenta?**
  - Asignó autónomamente los códigos hexadecimales dentro de la gama morada/azul (`#0F0C20`, `#1E1838`, `#8B5CF6`).
  - Propuso una escala modular tipográfica basada en la función CSS `clamp()`.
  - Asumió un carrito modal flotante estándar con totalización acumulada en lugar del pedido unitario directo.
- **¿Qué elementos coinciden con su idea inicial y cuáles no?**
  - _Coincidencias:_ La jerarquía global de secciones (_Home_, _About_, _Products_, _Contact_), el interlineado de `1.5rem` y la estética nocturna moderna.
  - _Discrepancias:_ Incluyó inicialmente suposiciones de pasarela de pago y no contempló la especificidad de las 4 recetas solicitadas hasta que se refinó la orden.

### Reto 2. One-shot: Proporcionar un Ejemplo

- **Prompt ejecutado:** Se entregó como referencia la anatomía de una tarjeta de productos (imagen fija con carga diferida, badge flotante, H3, descripción, selector interactivo de tamaño, precio en COP y botón táctil de 48x48px).
- **¿La IA entendió el patrón?, ¿lo adaptó o simplemente lo copió?**
  - La IA **entendió y adaptó el patrón** al modelo de negocio de Mamma Mia Pizza.
  - No se limitó a clonar la plantilla genérica: configuró precios reales en pesos colombianos para tres tamaños (Personal, Mediana, Familiar), asignó el badge exclusivo de `★ MEJOR REVIEW` a la Pizza Napolitana, asignó badges de disponibilidad a las pizzas de Carne y Pollo, e incorporó el distintivo `OPCIÓN GREEN` a la Vegetariana, enlazando el botón de acción al modal de despacho directo.

### Reto 3. Few-shot: Establecer Varias Referencias

- **Prompt ejecutado:** Se suministraron convenciones transversales para: (1) Tarjetas (fondo `#1E1838`, bordes `12px`, sombras suaves), (2) Botones (áreas de 48px, contraste accesible, `:hover` y `:focus`), y (3) Secciones (H2 centrado, subtítulo descriptivo y CSS Grid responsivo).
- **¿Qué tan consistente es la propuesta?**
  - La coherencia visual fue total. Todos los módulos (hero, about, catálogo, contacto y footer) adoptaron los mismos tokens de diseño: radios de curvatura idénticos, espaciados uniformes y contrastes estandarizados.
- **¿Qué ventajas encuentras frente a One-shot?**
  - Mientras que _One-shot_ optimiza un único componente local (la tarjeta de pizza), _Few-shot_ crea un **sistema de diseño global (_Design System Tokens_)**. Esto evita que el formulario de contacto o las tarjetas de horarios tengan estilos disonantes respecto a la sección principal de productos.

### Reto 4. Chain of Thought (CoT): Planificar antes de Generar

- **Prompt ejecutado:** Solicitud de un plan de trabajo dividido en 5 etapas secuenciales (necesidades, jerarquía, colores/tipografía, interacciones y responsive) con justificaciones técnicas antes de emitir la propuesta.
- **¿El plan permitió detectar problemas antes de diseñar?**
  - Sí. Permitió prever que el uso de fuentes web pesadas afectaría el _First Contentful Paint_ (FCP) en dispositivos móviles, decidiendo usar fuentes nativas del sistema (`Helvetica, Arial, sans-serif`). También permitió notar que pedir confirmación de reserva generaría confusión en un negocio que opera exclusivamente con entregas a domicilio y recogida en local.
- **¿Qué decisiones se justificaron mejor?**
  - La justificación del ratio de contraste accesible WCAG AA (superior a 4.5:1 y alcanzando 14.8:1 en textos principales).
  - La reserva de espacio de imágenes mediante `aspect-ratio: 16 / 9` para evitar el desplazamiento acumulativo de la interfaz (_Cumulative Layout Shift_).
  - La arquitectura del modal nativo `<dialog>` con captura de foco y cierre accesible mediante tecla `Escape`.

---

## 5. Actividad 9: Refinamiento Iterativo y Caso de Corrección Localizada

### Registro de Iteraciones Técnicas

| Iteración       | Objetivo                       | Solicitud / Cambio Realizado                          | Justificación y Criterio de Verificación                                                         |
| :-------------- | :----------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Iteración 1** | Estructura Semántica           | Marcado semántico sin redundancia de `<div>`.         | Uso de `<header>`, `<main>`, `<article>`, `<figure>`, `<dialog>` y jerarquía H1 a H3 verificada. |
| **Iteración 2** | Identidad Visual               | Declaración de variables CSS en `:root`.              | Paleta análoga en morados y azules oscuros con interlineado global de `1.5rem`.                  |
| **Iteración 3** | Proporciones y Layout          | Control de desbordamientos y dimensiones de imágenes. | Adición de `aspect-ratio: 16 / 9`, `object-fit: cover` y `loading="lazy"`.                       |
| **Iteración 4** | Accesibilidad e Interactividad | Comportamiento del menú móvil, modal y filtros.       | Gestión de atributos `aria-expanded`, navegación por teclado y cálculo reactivo en `$ COP`.      |
| **Iteración 5** | Diseño Responsive              | Adaptación a viewports de 360px, 640px y 1024px.      | Media queries Mobile-First garantizando áreas táctiles $\ge 48\text{px} \times 48\text{px}$.     |

---

### Caso de Corrección Localizada: CSS Grid de Productos

- **Diagnóstico del problema:** Las tarjetas del catálogo se presentaban colapsadas y excesivamente delgadas en pantallas grandes (>1024px), mientras que en pantallas móviles estrechas (360px) generaban desbordamiento horizontal.
- **Selector CSS modificado:** `.products-grid`
- **Código de solución implementado:**

```css
/* Corrección Mobile-First con CSS Grid */
.products-grid {
  display: grid;
  grid-template-columns: 1fr; /* Una columna vertical fluida para móviles */
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Tablet (desde 640px hasta 1023px) */
@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas balanceadas */
    gap: 1.75rem;
  }
}

/* Escritorio (desde 1024px en adelante) */
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas para las 4 pizzas */
    gap: 1.5rem;
  }
}
```

- **Pruebas de verificación realizadas:**
  1. _Emulación a 360px:_ Se comprobó que el contenedor se ajusta al ancho de pantalla sin generar scroll horizontal (`overflow-x: hidden`).
  2. _Emulación a 768px:_ Las 4 pizzas se distribuyen en una cuadrícula simétrica de 2x2.
  3. _Emulación a 1280px:_ Las 4 especialidades se disponen horizontalmente en una única fila uniforme.

---

## 6. Actividad 10: Lista de Comprobación y Validación Técnica

### Diseño y Propósito

- [x] **El diseño corresponde al propósito y la audiencia definidos:** Estilo nocturno moderno con enfoque en venta rápida para clientes mayoristas y minoristas.
- [x] **Las secciones tienen una jerarquía visual coherente:** Flujo lógico: Identidad e impacto (_Hero_) $\rightarrow$ Reglas operativas (_About_) $\rightarrow$ Catálogo de compra (_Products_) $\rightarrow$ Soporte y Feedback (_Contact_).
- [x] **Los colores, la tipografía y el espaciado son consistentes:** Uso de tokens CSS unificados, interlineado de `1.5rem` y ratios de contraste WCAG AA cumplidos.

### HTML y Accesibilidad

- [x] **Se utilizan etiquetas semánticas correctamente:** Empleo de elementos semánticos estándar sin caer en redundancia de contenedores genéricos.
- [x] **Los formularios tienen etiquetas y campos identificables:** Cada `<input>`, `<select>` y `<textarea>` tiene su `<label for="...">` vinculado, con campos `required` explícitos.
- [x] **Los enlaces y botones tienen una función clara:** Textos autodescriptivos ("Pedir Ítem", "Ver Menú y Precios"), acompañados de `aria-label` y `aria-expanded` en controles dinámicos.

### CSS y Responsividad

- [x] **El sitio se visualiza correctamente a 480 px:** Columna única con márgenes de seguridad.
- [x] **El sitio se visualiza correctamente a 768 px:** Distribución en rejilla de 2 columnas balanceada.
- [x] **El sitio se visualiza correctamente a 1200 px o más:** Cuadrícula de 4 columnas centrada con `max-width: 1200px`.
- [x] **No hay desbordamientos horizontales inesperados:** Contención mediante `box-sizing: border-box` y `max-width: 100%`.

### JavaScript y Mantenimiento

- [x] **Las interacciones funcionan como se esperaba:** El cambio de tamaño recalcula el precio en COP en tiempo real; el selector de ordenamiento reordena los nodos en el DOM.
- [x] **El formulario valida los campos y evita envíos inválidos:** Prevención de envío por defecto (`event.preventDefault()`), validación de campos obligatorios y mensajes de error en pantalla.
- [x] **La consola del navegador no muestra errores atribuibles al proyecto:** Ejecución limpia en Vanilla JavaScript sin referencias nulas.
- [x] **Los archivos están separados y el código es legible:** `index.html`, `style.css` y `app.js` desacoplados, estructurados y comentados.

---

## 7. Actividad 11: Cierre y Discusión en Clase

### 1. ¿Cuál de las cuatro técnicas produjo el resultado más útil para su proyecto y por qué?

**Chain of Thought (CoT) combinada con Few-shot.**  
_Chain of Thought_ obligó a razonar secuencialmente la lógica del negocio antes de generar código (identificando que el modelo de Mamma Mia Pizza se basa en despachos rápidos y pedidos unitarios directos sin reserva física). Por su parte, _Few-shot_ aportó las convenciones de diseño visual (estados `:focus-visible`, tokens cromáticos y áreas de 48px), asegurando un resultado consistente y listo para producción sin componentes innecesarios.

### 2. ¿Qué diferencia observaste entre proporcionar un ejemplo y proporcionar varios?

Al proporcionar un solo ejemplo (_One-shot_), la IA logra modelar con alta precisión ese componente específico (la tarjeta de pizza), pero tiende a improvisar el resto de la interfaz con estilos no relacionados. Al proporcionar varios ejemplos y reglas consistentes (_Few-shot_), la IA comprende el **sistema de diseño subyacente**, aplicando los mismos radios de curvatura, paleta de colores y patrones de accesibilidad a la barra de navegación, a las tarjetas informativas y a los formularios.

### 3. ¿Qué información importante surgió al aplicar Meta-prompting?

Surgió la necesidad de estructurar el requerimiento mediante **variables técnicas delimitadas**. En lugar de solicitar una descripción general, el meta-prompting reveló que debían fijarse los breakpoints exactos (360px, 640px, 1024px), las razones de contraste de color bajo la norma WCAG AA, la gestión de estados ARIA para lectores de pantalla y la proporción de aspecto de imágenes para evitar saltos de página (_CLS_).

### 4. ¿Qué cambios introdujiste gracias a la revisión humana que la IA no había considerado?

1. **Modelo de pedido directo:** Sustituir el carrito tradicional complejo por un flujo inmediato de pedido ítem por ítem enfocado a despacho a domicilio o llamada directa.
2. **Localización de divisa:** Establecer el formato numérico y simbólico en pesos colombianos (`$ COP`) con separadores de miles adecuados.
3. **Restricción de infraestructura:** Aclarar explícitamente en la sección _About_ que el local opera exclusivamente bajo modalidades de delivery y recogida rápida, evitando solicitudes fallidas de mesas.

### 5. ¿Qué errores encontraste en el código generado y cómo los verificaste?

- _Colapso visual de imágenes al cargar:_ Al no contar con una proporción fija inicial, el navegador provocaba un salto de diseño (_Layout Shift_) al cargar las fotografías. Se verificó en DevTools y se resolvió declarando `aspect-ratio: 16 / 9` y `object-fit: cover`.
- _Inaccesibilidad en el menú móvil:_ El menú no comunicaba su estado a los lectores de pantalla ni se cerraba con la tecla Escape. Se corrigió programando el listener de teclado y alternando dinámicamente `aria-expanded="true/false"`.

### 6. ¿Qué harías diferente si tuvieras que desarrollar nuevamente el mismo sitio?

Integraría desde el primer prompt de _Priming_ un esquema de tokens en formato JSON o variables directas de CSS (`--color-surface`, `--color-primary`, `--spacing-unit`). De este modo, la IA estructuraría la hoja de estilos de forma limpia desde la primera iteración, reduciendo los ciclos de refinamiento manual sobre el archivo `style.css`.
