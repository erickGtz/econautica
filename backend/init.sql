CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL,     
    apellido_pat VARCHAR(255) NOT NULL,  
    apellido_mat VARCHAR(255) NOT NULL,         
    ubicacion VARCHAR(255) NOT NULL,   
    telefono BIGINT(20) NOT NULL,            
    correo VARCHAR(255) NOT NULL,    
    contrasena VARCHAR(255) NOT NULL,         
    tipo TINYINT(1)    
);

CREATE TABLE encuestas ( 
  id INT AUTO_INCREMENT PRIMARY KEY, 
  id_usuario INT NOT NULL, 
  q1 INT(11) NOT NULL, 
  q2 INT(11) NOT NULL, 
  q3 INT(11) NOT NULL, 
  q4 INT(11) NOT NULL, 
  q5 INT(11) NOT NULL, 
  q6 INT(11) NOT NULL, 
  q7 INT(11) NOT NULL, 
  q8 INT(11) NOT NULL, 
  q9 VARCHAR(255) NOT NULL, 
  CONSTRAINT fk_usuario_encuesta FOREIGN KEY (id_usuario) REFERENCES usuarios(id) 
); 


