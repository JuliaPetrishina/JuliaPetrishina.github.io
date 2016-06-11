2.5 Алгоритм Дейкстры

Реализуйте функцию djkstra, принимающую на вход три аргумента: 
+ from - номер вершины из которой надо построить путь, 
+ to - номер вершины в которую надо построить путь, 
+ paths - массив ребер графа. 

Граф считать двунаправленным (т.е. если путь есть из from в to, то из to в from) тоже есть. 
Функция должна возвращать путь из вершины from в вершину to если таковой имеется, либо false - если не имеется