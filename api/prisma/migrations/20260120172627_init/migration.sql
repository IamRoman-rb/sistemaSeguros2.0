-- CreateTable
CREATE TABLE `marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `marca_marca_key`(`marca`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archivo` VARCHAR(191) NOT NULL,
    `patente_vehiculo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `foto_archivo_key`(`archivo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehiculo` (
    `patente` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `suma` DOUBLE NOT NULL,
    `chasis` VARCHAR(191) NOT NULL,
    `motor` VARCHAR(191) NOT NULL,
    `id_marca` INTEGER NOT NULL,

    UNIQUE INDEX `vehiculo_patente_key`(`patente`),
    UNIQUE INDEX `vehiculo_chasis_key`(`chasis`),
    UNIQUE INDEX `vehiculo_motor_key`(`motor`),
    PRIMARY KEY (`patente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provincia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `provincia_provincia_key`(`provincia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `localidad` VARCHAR(191) NOT NULL,
    `id_provincia` INTEGER NOT NULL,

    UNIQUE INDEX `localidad_localidad_key`(`localidad`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `dni` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `nacimiento` DATETIME(3) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `id_localidad` INTEGER NOT NULL,

    UNIQUE INDEX `cliente_dni_key`(`dni`),
    UNIQUE INDEX `cliente_telefono_key`(`telefono`),
    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sucursal` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sucursal_sucursal_key`(`sucursal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `rol_rol_key`(`rol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empleado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `dni` INTEGER NOT NULL,
    `clave` VARCHAR(191) NOT NULL,
    `id_sucursal` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,

    UNIQUE INDEX `empleado_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `es_ingreso` BOOLEAN NOT NULL DEFAULT true,
    `motivo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `importe` DOUBLE NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valido` BOOLEAN NOT NULL DEFAULT true,
    `id_empleado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tipo_actividad_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NOT NULL,
    `id_empleado` INTEGER NOT NULL,
    `id_tipo_actividad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metodo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `metodo_metodo_key`(`metodo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `importe` DOUBLE NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `valido` BOOLEAN NOT NULL DEFAULT true,
    `id_empleado` INTEGER NOT NULL,
    `id_poliza` VARCHAR(191) NOT NULL,
    `id_metodo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `empresa_empresa_key`(`empresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cobertura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cobertura` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    UNIQUE INDEX `cobertura_cobertura_key`(`cobertura`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `riesgo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `riesgo_riesgo_key`(`riesgo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_poliza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tipo_poliza_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cobertura_empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cobertura` INTEGER NOT NULL,
    `id_empresa` INTEGER NOT NULL,

    UNIQUE INDEX `cobertura_empresa_id_cobertura_id_empresa_key`(`id_cobertura`, `id_empresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cobertura_riesgo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cobertura` INTEGER NOT NULL,
    `id_riesgo` INTEGER NOT NULL,

    UNIQUE INDEX `cobertura_riesgo_id_cobertura_id_riesgo_key`(`id_cobertura`, `id_riesgo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poliza_cobertura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_poliza` VARCHAR(191) NOT NULL,
    `id_cobertura` INTEGER NOT NULL,

    UNIQUE INDEX `poliza_cobertura_numero_poliza_id_cobertura_key`(`numero_poliza`, `id_cobertura`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poliza_vehiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_poliza` VARCHAR(191) NOT NULL,
    `patente_vehiculo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `poliza_vehiculo_numero_poliza_patente_vehiculo_key`(`numero_poliza`, `patente_vehiculo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poliza` (
    `numero` VARCHAR(191) NOT NULL,
    `emision` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `periodo` INTEGER NOT NULL,
    `cuotas` INTEGER NOT NULL,
    `premio` DOUBLE NOT NULL,
    `valido` BOOLEAN NOT NULL DEFAULT true,
    `id_tipo_poliza` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_sucursal` INTEGER NOT NULL,
    `id_empleado` INTEGER NOT NULL,

    UNIQUE INDEX `poliza_numero_key`(`numero`),
    PRIMARY KEY (`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `foto` ADD CONSTRAINT `foto_patente_vehiculo_fkey` FOREIGN KEY (`patente_vehiculo`) REFERENCES `vehiculo`(`patente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehiculo` ADD CONSTRAINT `vehiculo_id_marca_fkey` FOREIGN KEY (`id_marca`) REFERENCES `marca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `localidad` ADD CONSTRAINT `localidad_id_provincia_fkey` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_localidad_fkey` FOREIGN KEY (`id_localidad`) REFERENCES `localidad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empleado` ADD CONSTRAINT `empleado_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empleado` ADD CONSTRAINT `empleado_id_sucursal_fkey` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimiento` ADD CONSTRAINT `movimiento_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actividad` ADD CONSTRAINT `actividad_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actividad` ADD CONSTRAINT `actividad_id_tipo_actividad_fkey` FOREIGN KEY (`id_tipo_actividad`) REFERENCES `tipo_actividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_id_metodo_fkey` FOREIGN KEY (`id_metodo`) REFERENCES `metodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_id_poliza_fkey` FOREIGN KEY (`id_poliza`) REFERENCES `poliza`(`numero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobertura_empresa` ADD CONSTRAINT `cobertura_empresa_id_cobertura_fkey` FOREIGN KEY (`id_cobertura`) REFERENCES `cobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobertura_empresa` ADD CONSTRAINT `cobertura_empresa_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobertura_riesgo` ADD CONSTRAINT `cobertura_riesgo_id_cobertura_fkey` FOREIGN KEY (`id_cobertura`) REFERENCES `cobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cobertura_riesgo` ADD CONSTRAINT `cobertura_riesgo_id_riesgo_fkey` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza_cobertura` ADD CONSTRAINT `poliza_cobertura_numero_poliza_fkey` FOREIGN KEY (`numero_poliza`) REFERENCES `poliza`(`numero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza_cobertura` ADD CONSTRAINT `poliza_cobertura_id_cobertura_fkey` FOREIGN KEY (`id_cobertura`) REFERENCES `cobertura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza_vehiculo` ADD CONSTRAINT `poliza_vehiculo_numero_poliza_fkey` FOREIGN KEY (`numero_poliza`) REFERENCES `poliza`(`numero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza_vehiculo` ADD CONSTRAINT `poliza_vehiculo_patente_vehiculo_fkey` FOREIGN KEY (`patente_vehiculo`) REFERENCES `vehiculo`(`patente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_id_tipo_poliza_fkey` FOREIGN KEY (`id_tipo_poliza`) REFERENCES `tipo_poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_id_sucursal_fkey` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poliza` ADD CONSTRAINT `poliza_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
