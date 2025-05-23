CREATE DATABASE praticar;

use praticar;

create table Aluno(
id_aluno int primary key auto_increment, 
nome varchar(45), 
email varchar(80)
);

create table Curso(
id_curso int primary key auto_increment, 
nome_curso varchar(45), 
descricao varchar(90)
);

create table Aluno_Curso(
fk_aluno int, 
fk_curso int, 
data_inscricao DATE,
primary key(fk_aluno, fk_curso),
constraint alunoCurso
foreign key (fk_aluno) references Aluno(id_aluno),
foreign key (fk_curso) references Curso(id_curso)
);

create table Acesso(
fk_aluno int, 
fk_curso int, 
data_acesso datetime, 
duracao_minutos int,
primary key(fk_aluno, fk_curso, data_acesso),
constraint AcessoCurso
foreign key (fk_aluno, fk_curso) references Aluno_Curso(fk_aluno, fk_curso)
);

insert into Aluno(nome, email) values
('Ana Silva', 'ana.silva@sptech.school'),
('Joana Claudia', 'joana.claudia@sptech.school'),
('Joao Gomes','joao.gomes@sptech.school'),
('Clovis Jerson','clovis.jerson@sptech.school');

insert into Curso(nome_curso, descricao) values
('Algoritmo', 'Foco em lógica de programação'),
('Java basico', 'introdução a linguagem java'),
('ITIL','Biblioteca');

insert into Aluno_Curso values
(1,1, '2025-01-23'),
(1,2, '2024-12-28'),
(2,1, '2025-02-22'),
(4,3, '2025-04-13'),
(3,3, '2025-05-08'),
(4,2, '2024-11-29');

insert into Acesso (fk_aluno, fk_curso, data_acesso, duracao_minutos) values
(1,1, '2025-05-23 12:30:00', 170),
(1,2, '2025-05-28 18:45:10', 90),
(2,1, '2025-04-22 08:30:00', 60),
(4,3, '2025-04-13 19:00:36', 30),
(3,3, '2025-05-08 14:20:00', 50),
(4,2, '2024-12-30 10:10:00', 75);

-- 1 Listar todos os alunos e os cursos em que estão inscritos.
select Aluno.nome, Aluno.email, Curso.nome_curso, 
Curso.descricao, Aluno_curso.data_inscricao
from Aluno join Aluno_Curso on id_aluno = fk_aluno
join curso on id_curso = fk_curso;

select * from aluno 
join Aluno_Curso on id_aluno = fk_aluno
join curso on id_curso = fk_curso;



-- 2 Exibir todos os acessos feitos pela aluna “Ana Silva”, com data e duração.
select Acesso.data_acesso, Acesso.duracao_minutos
from Acesso join Aluno on Acesso.fk_aluno = Aluno.id_aluno
WHERE Aluno.nome = 'Ana Silva'; 

-- 3 Listar os cursos que têm mais de 1 aluno inscrito.
select Curso.nome_curso, COUNT(Aluno_Curso.fk_aluno) as total_alunos
from Curso join Aluno_Curso on Curso.id_curso = Aluno_Curso.fk_curso
group by Curso.id_curso
having COUNT(Aluno_Curso.fk_aluno) > 1;

-- 4 Exibir a duração média dos acessos em cada curso.
select Curso.nome_curso, AVG(Acesso.duracao_minutos) as duracao_media
from Curso join Acesso on Curso.id_curso = Acesso.fk_curso
group by Curso.id_curso;

-- 5 Mostrar o total de minutos acessados por cada aluno em cada curso.
select Aluno.nome, Curso.nome_curso, SUM(Acesso.duracao_minutos) as total_minutos_acessados
from Acesso join Aluno on Acesso.fk_aluno = Aluno.id_aluno
join Curso on Acesso.fk_curso = Curso.id_curso
group by Aluno.id_aluno, Curso.id_curso;

-- 6 Criar uma VIEW chamada vw_total_acessos 
create view vw_total_acessos as
select Aluno.id_aluno, Aluno.nome,
Curso.id_curso, Curso.nome_curso,
SUM(Acesso.duracao_minutos) as total_minutos_acessados
from Acesso join Aluno on Acesso.fk_aluno = Aluno.id_aluno
join Curso on Acesso.fk_curso = Curso.id_curso
group by Aluno.id_aluno, Curso.id_curso;

select * from vw_total_acessos;

-- 7 Criar uma VIEW chamada vw_estatisticas_curso
create view vw_estatisticas_curso as
select Curso.id_curso, Curso.nome_curso,
COUNT(Aluno_Curso.fk_aluno) as quantidade_alunos_inscritos,
AVG(Acesso.duracao_minutos) as tempo_medio_acesso
from Curso left join
Aluno_Curso on Curso.id_curso = Aluno_Curso.fk_curso
left join Acesso on Curso.id_curso = Acesso.fk_curso
group by Curso.id_curso;

select * from vw_estatisticas_curso;

-- 8 Exibir os 3 alunos com mais tempo total de acesso (em minutos).
select Aluno.nome,
SUM(Acesso.duracao_minutos) as total_minutos_acessados
from Acesso join Aluno on Acesso.fk_aluno = Aluno.id_aluno
group by Aluno.id_aluno order by
total_minutos_acessados desc limit 3;

-- 9 Listar os cursos que nunca foram acessados.
select Curso.id_curso, Curso.nome_curso
from Curso left join
Acesso on Curso.id_curso = Acesso.fk_curso
where Acesso.fk_curso is null;

-- 10 Mostrar a quantidade de acessos por data, agrupando por dia.
select date(Acesso.data_acesso) as data,
COUNT(*) as quantidade_acessos
from Acesso group by date(Acesso.data_acesso);