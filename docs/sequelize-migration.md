npx sequelize-cli model:generate --name User --attributes email:string,password:string,status:integer

npx sequelize-cli model:generate --name Categoria --attributes nombre:string,detalle:text

npx sequelize-cli model:generate --name Producto --attributes nombre:string,precio:decimal,stock:integer,imagen:string,descripcion:text,estado:boolean,categoriaId:integer

npx sequelize-cli model:generate --name Cliente --attributes nombre_completo:string,nit:string,telefocorreo:string,ci_nit:string,telefono:string

npx sequelize-cli model:generate --name Pedido --attributes fecha:date,estado:integer,observacion:text,clienteId:integer

npx sequelize-cli model:generate --name PedidoProducto --attributes pedidoId:integer,productoId:integer,cantidad:integer


Para Migrar 
npx sequelize-cli db:migrate