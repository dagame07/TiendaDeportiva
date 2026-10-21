# Sports Store

Landing page de una tienda deportiva creada en un intenso hackatron de 6 horas. Presenta una selección de ropa y calzado deportivo mediante un catálogo visual y permite simular la selección de productos con un carrito de compras.

## Descripción y funcionamiento

La página está organizada en las siguientes secciones:

- **Barra de navegación:** muestra la marca Sports Store, enlaces para las categorías Destacados, Hombres, Mujeres y Niños, un campo de búsqueda y el acceso al carrito. En esta versión, los enlaces de categoría y el campo de búsqueda son elementos visuales; no filtran ni buscan productos.
- **Carrusel principal:** muestra tres imágenes promocionales. Sus indicadores y controles permiten avanzar o retroceder entre las imágenes.
- **Catálogo:** las tarjetas de productos se generan desde `script.js`. Cada tarjeta muestra una imagen, nombre, descripción, precio en pesos mexicanos y un botón para agregar el producto al carrito. La cuadrícula se adapta a distintos tamaños de pantalla.
- **Carrito:** se abre como un panel lateral con fondo superpuesto. Muestra los productos seleccionados, permite aumentar o disminuir cantidades, quitar productos y consultar el subtotal. El botón del carrito también indica el número total de unidades.
- **Pie de página:** incluye el aviso de derechos y la identificación del Team 6.

El carrito es una demostración del lado del cliente: su contenido se mantiene en memoria mientras la página está abierta y se reinicia al recargarla. Se permite agregar hasta 10 unidades por producto. La acción **Finalizar compra** y el texto sobre el envío son parte de la interfaz; todavía no existe un flujo de pago, envío ni conexión con un servicio externo.

## Cómo ejecutar

No se requiere instalación de dependencias ni un servidor para probar la página:

1. Descarga o clona este repositorio.
2. Abre `index.html` en un navegador web.
3. Para ver el carrusel y el menú adaptable de Bootstrap, así como los estilos de Bootstrap, se necesita conexión a internet, ya que la biblioteca se carga desde un CDN.

También puedes abrir el proyecto con una extensión de servidor local de tu editor si prefieres visualizarlo desde una dirección local.

## Estructura del proyecto

```text
.
├── index.html       # Estructura de la landing page
├── style.css        # Estilos, diseño adaptable y componentes visuales
├── script.js        # Catálogo y lógica del carrito de compras
└── Pictures/        # Logotipo e imágenes del carrusel y los productos
```

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8, cargado desde CDN para los componentes de navegación y carrusel

## Personalización del catálogo

Los productos, precios, descripciones e imágenes se definen en el arreglo `products` de `script.js`. Las rutas de las imágenes apuntan a archivos dentro de `Pictures/`. El límite de unidades por producto se configura mediante la constante `MAX_POR_PRODUCTO`.

## Integrantes del equipo 6:

    -Aldo Briones Martinez
    -Denisse Azucena Garza Ascacio
    -Miguel Sanchez
    -Roberto Carlos
