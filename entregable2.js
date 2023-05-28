const iva = 0.21;

function ivaDelValorDeclarado(valorDeclarado) {
  return valorDeclarado * iva;
}

function calcularImpuestos() {
  let numeroFactura = prompt("Ingrese el número de factura (de 8 a 10 caracteres):");
  while (numeroFactura.length < 8 || numeroFactura.length > 10) {
    numeroFactura = prompt("Número de factura inválido. Ingrese un número de factura de 8 a 10 caracteres:");
  }

  let unidades = parseInt(prompt("Ingrese la cantidad de unidades (máximo 100):"));
  while (unidades < 1 || unidades > 100) {
    unidades = parseInt(prompt("Cantidad de unidades inválida. Ingrese una cantidad de unidades entre 1 y 100:"));
  }

  let peso = parseInt(prompt("Ingrese el peso en gramos (máximo 2000 g):"));
  while (peso < 1 || peso > 2000) {
    peso = parseInt(prompt("Peso inválido. Ingrese un peso entre 1 y 2000 gramos:"));
  }

  let valorDeclarado = parseFloat(prompt("Ingrese el valor declarado: $"));

  let tiposProductos = [
    { nombre: "bijou", estampillado: false },
    { nombre: "accesorios de pelo", estampillado: true },
    { nombre: "marroquineria", estampillado: true },
    { nombre: "indumentaria", estampillado: true },
    { nombre: "articulos de tecnología", estampillado: true },
  ];

  console.log("Seleccione el tipo de producto:");

  for (let i = 0; i < tiposProductos.length; i++) {
    console.log(`${i + 1}. ${tiposProductos[i].nombre}`);
  }

  let opcionTipoProducto = parseInt(prompt(`Ingrese el número correspondiente al tipo de producto (1-${tiposProductos.length}):`));
  while (opcionTipoProducto < 1 || opcionTipoProducto > tiposProductos.length) {
    opcionTipoProducto = parseInt(prompt(`Opción inválida. Ingrese un número del 1 al ${tiposProductos.length}:`));
  }

  let tipoProducto = tiposProductos[opcionTipoProducto - 1].nombre;
  let productoEstampillado = tiposProductos[opcionTipoProducto - 1].estampillado;

  let tiempoAduanas = 0;

  if (productoEstampillado) {
    console.log("El producto necesita ser estampillado.");

    let tieneTextil = prompt("El producto tiene textiles en su composición? (Si/No):").toLowerCase() === "si";

    if (tieneTextil) {
      let tejido = prompt("El producto es tejido de punto o plano?").toLowerCase();

      if (tejido === "punto") {
        tiempoAduanas = 6 + 3; // 6 días de tejido de punto + 3 días de estampillado común
        console.log("El producto necesita estampillado por tejido de punto. El tiempo mínimo en salir de aduanas es de 9 días por estampillado.");
      } else if (tejido === "plano") {
        tiempoAduanas = 3 + 3; // 3 días de tejido plano + 3 días de estampillado común
        console.log("El producto necesita estampillado por tejido plano. El tiempo mínimo en salir de aduanas es de 6 días por estampillado.");
      } 
    } else {
      tiempoAduanas = 3; // 3 días de estampillado común
      console.log("El producto necesita estampillado común. El tiempo mínimo en salir de aduanas es de 3 días por estampillado.");
    }
  } else {
    tiempoAduanas = 2; // 1 día sin estampillado
    console.log("El producto no necesita estampillado. El tiempo mínimo en salir de aduanas es de 2 días.");
  }

  let tiempoTotal = tiempoAduanas + 1; // 1 día de proceso adicional

  console.log(`El tiempo mínimo estimado en salir de aduanas es de ${tiempoAduanas} días.`);

  let impuestoUnidades = 0;
  if (unidades > 100 && unidades < 121) {
    impuestoUnidades = 0.09;
    console.log(`Deberá pagar una penalidad del ${impuestoUnidades * 100}% por exceder las 100 unidades.`);
  }

  let impuestoPeso = 0;
  if (peso > 1000 && peso < 1501) {
    impuestoPeso = 0.18;
    console.log(`Deberá pagar una penalidad del ${impuestoPeso * 100}% por exceder los 1000 gramos.`);
  }

  let impuestoTotal = 0;
  if (unidades > 100 && unidades < 151 && peso > 1000 && peso < 1501) {
    impuestoTotal = 0.4;
    console.log(`Deberá pagar una penalidad del ${impuestoTotal * 100}% por exceder las 100 unidades y los 1000 gramos.`);
  }

  let impuestosAPagar = Math.max(impuestoUnidades, impuestoPeso, impuestoTotal);

  let ivaAPagar = ivaDelValorDeclarado(valorDeclarado);

  let totalAPagar = valorDeclarado * impuestosAPagar + ivaAPagar;

  console.log(`El total a pagar es de $${totalAPagar.toFixed(2)}`);
}

calcularImpuestos();

