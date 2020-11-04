-- MySQL Workbench Synchronization
-- Generated: 2020-11-03 12:41
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: mmenc

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `oficioive7122020`.`camposMinimos` 
DROP FOREIGN KEY `fk_actclie_cliente_datosPersonales`,
DROP FOREIGN KEY `fk_actclie_infoEcoIni`,
DROP FOREIGN KEY `fk_cm_dicFm`;

ALTER TABLE `oficioive7122020`.`camposMinimos` 
CHANGE COLUMN `infoEconomica` `infoEconomica` INT(11) NOT NULL ;

ALTER TABLE `oficioive7122020`.`camposMinimos` 
DROP FOREIGN KEY `fk_actclie_lugar`,
DROP FOREIGN KEY `fk_actclie_representante_datosPersonales`;

ALTER TABLE `oficioive7122020`.`camposMinimos` ADD CONSTRAINT `fk_actclie_lugar`
  FOREIGN KEY (`lugar`)
  REFERENCES `oficioive7122020`.`lugar` (`idLugar`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_actclie_cliente_datosPersonales`
  FOREIGN KEY (`cliente`)
  REFERENCES `oficioive7122020`.`datosPersonales` (`idDatosPersonales`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_actclie_representante_datosPersonales`
  FOREIGN KEY (`representante`)
  REFERENCES `oficioive7122020`.`datosPersonales` (`idDatosPersonales`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_actclie_infoEcoIni`
  FOREIGN KEY (`infoEconomica`)
  REFERENCES `oficioive7122020`.`informacionEconomicaInicial` (`idInformacionEconomicaInicial`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_cm_dicFm`
  FOREIGN KEY (`diccionarioFormulario`)
  REFERENCES `oficioive7122020`.`diccionarioFormulario` (`iddiccionarioFormulario`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


DELIMITER $$

USE `oficioive7122020`$$
CREATE DEFINER = CURRENT_USER TRIGGER `oficioive7122020`.`camposMinimos_AFTER_INSERT` AFTER INSERT ON `camposMinimos` FOR EACH ROW
BEGIN
IF (new.tipoActuacion = 'R' AND new.calidadActua is null) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se permite null en el campo calidadactua cuando el tipo es R';
END IF;
END$$

USE `oficioive7122020`$$
CREATE DEFINER = CURRENT_USER TRIGGER `oficioive7122020`.`camposMinimos_AFTER_UPDATE` AFTER UPDATE ON `camposMinimos` FOR EACH ROW
BEGIN
IF (new.tipoActuacion = 'R' AND new.calidadActua is null) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se permite null en el campo calidadactua cuando el tipo es R';
END IF;
END$$


DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
