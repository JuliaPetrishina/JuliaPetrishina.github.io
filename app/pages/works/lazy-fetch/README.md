#Lazy fetch

Напишите функцию `lazyFetch`, которая ведет себя практически аналогично функции fetch для получения данных, но если функция вызывалась с такими же аргументами в течении последних 30 секунд - то запрос реально не выполняется, а сразу же возвращается результат. В рамках этого задания можете ограничиться одним аргументом функции fetch (только URL)

Пример:

`lazyFetch('http://pokeapi.co/api/v2/pokemon/1').then(r => console.log(r));
// видим запрос в Network вкладке
lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
// видим запрос в Network вкладке
lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
// НЕ ВИДИМ запрос в network вкладке`

Функция `lazyFetch` НЕ ДОЛЖНА полагаться в работе на какие-либо глобальные переменные, либо использовать их (обратите внимание, если бы я писал `fetch` - мне бы еще пришлось бы писать `.then(r => r.json())`. Здесь этого нет - это так и задумано