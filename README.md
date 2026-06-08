# ChismoNano

Plataforma de perfiles con respuestas desbloqueables mediante Nano (XNO). El
MVP actual valida el cuestionario publico fijo de ChismoNano y el login por
wallet Nano.

## Stack inicial

- React 19
- TypeScript
- Vite
- lucide-react

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Flujo actual

- El usuario ve el cuestionario padre.
- Las preguntas son fijas y no se editan.
- Solo se contestan las preguntas que el usuario esta dispuesto a revelar.
- El perfil futuro se crea con las preguntas contestadas.
- El login abre la wallet Nano para pagar 0.01 XNO.
- La sesion solo debe activarse cuando el sistema confirme la transferencia real.

## Tasa XNO/USD

La referencia visible `1 XNO = X USD` se edita manualmente en:

```ts
src/config/xnoRate.ts
```

Actualiza el valor de `xnoUsdRate` segun el precio diario de Nano.

## Tienda XNO

La tienda ya vive como app independiente fuera de este proyecto:

```txt
../xno-store/
```

Las cantidades de los paquetes se editan en:

```ts
../xno-store/src/packages.ts
```

El precio de 1 XNO para calcular todos los paquetes se edita en:

```ts
../xno-store/src/xnoUnitPrices.ts
```

Cada paquete calcula valor en COP, BTC y USDT.

Al elegir un paquete, la tienda solicita la direccion Nano donde se enviaran los
fondos. Si el usuario no tiene wallet (monedero XNO), la tienda ofrece descargar
una.

Las cuentas de pago se editan en:

```ts
../xno-store/src/paymentAccounts.ts
```

Ese archivo tambien contiene la linea de soporte para compras.

Para correrla por separado:

```bash
cd ../xno-store
npm install
npm run dev
```

La app principal enlaza a la tienda con `VITE_XNO_STORE_URL`. Si no existe esa
variable, usa `http://localhost:5174` para desarrollo local.

## Proximos pasos sugeridos

- Persistencia de perfiles, preguntas y ramas.
- Login por cuenta Nano con transferencia de verificacion.
- Pagos reales y verificacion de recepcion en la cuenta del creador.
- Panel para crear y editar arboles de preguntas.
- Historial de desbloqueos por visitante.
- Compra de XNO desde la plataforma.
