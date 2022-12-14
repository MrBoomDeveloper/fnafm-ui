# Руководство по разработке FNaF Multiplayer

### Внимание! Не все перечислинные ниже операции доступны на данный момент. Имейте терпение.

## Корневая папка
Служит хранилищем часто используемых файлов игры.

### Папка /css
Содержит скомпилированные копии файлов пути /sass

### Папка /sass
Содержит файлы, необходимые для правильного отображения 
интерфейса приложения. 
custom.sass включает в себя еще _default.scss, 
_gameover.scss и _popup.scss. 
boom.sass является копией скомпилированного boom.sass. 
Вы его не найдете в исходниках игры, 
так-как он находится в файлах сайта MrBoomDev и разбит 
на несколько менее больших для удобства 
(boom.sass, _cards.scss, _layout.scss и _text.scss)

## blocks.json
Данный файл отвечает за отображение объектов на карте.
### Файл выполнен в формате:

``` 
{
	айди_объекта: {
		ключ: "значение",
		список_значений: [
			"значение1",
			"значение2"
		],
		список_ключей: {
			ключ: "значение",
			ключ2: "значение"
		}
	}
}
```

### Поддерживаемые ключи

#### barrier
Определяет коллизию объекта. 
Если стоит значение true, 
то игрок не может пройти через объект
```
barrier: true
```

#### texture
Изображение может быть png или jpg

##### Если объект постоянно использует лишь одну текстуру, то пишем:
```
texture: "путь_до_картинки.png"
```

##### Если объект всегда воспроизводит анимацию, то используем:
``` 
frames: [
	"путь_до_картинки_1.jpg",
	"путь_до_картинки_2.png"
],
animated: true,
animationSpeed: скорость в миллисекундах
```

### dynamic
Позволяет игроку интерактировать с объектом. 
При значении true в texture всегда следует использовать 
список ключей
```
dynamic: true,
action: "switchState",
texture: {
	"$isActive": "картинка_если_объект_активен.png",
	"$isActive!": "картинка_если_не_кативирован.png"
},
frames: [ //Не обязательный параметр. Позволяет анимировать объект во время взаимодействия
	"кадр1.png",
	"кадр2.png"
],
animated: true, //Нужен, если вы хотите анимировать объект
animationSpeed: $fast //Использовать если установлена анимация перехода
```

#### Дополнительные значения
Они не обязательны и не зависят от друг друга.
```
actionSfx: "звук_при_взаимодействии.mp3",
actionTimeout: $slow,
defaultState: true, //Включить по умолчанию
```

### Переменные
При попытке создания своей переменной, которая не 
поддерживается движком игры ничего не произойдет. 
А вот использовать уже существующие уже можно. Для 
этого вместо значения напишите название переменной.
```
barrier: "$isActive"
```
#### Список всех переменных
```
$fast //Возвращает 100
$middle //Возвращает 250
$slow //Возвращает 500
$isSwitchable //Возвращает true, если объект можно активировать
$isActive //Возвращает true, если объект активирован.
$isAnimationEnabled //Возвращает true, если игрок не выключил анимации в настройках
$isBroken //Возвращает true, если объект был сломан
$isColission //Возвращает true, если игрок касается объекта
$null //Возвращает значение по умолчанию взависимости от контекста
$platform //Может вернуть следующие значения: "mobile", "desktop", "web"
$url(https://example.com) //Возвращает полученный ответ от сервера
```

#### Операции с переменными
```
animated: "$isActive && $isAnimationEnabled" //Возвращает true, если оба значения верны
animated: "$isBroken || $isColission" //Возвращает true, если хотя-бы одно из значений верно
$isActive: true //Задает значение переменной
$random(0,100) //Возвращает случайное значение от 0 до 100
```

## /Maps
Данная папка содержит данные о картах 
для последующей их отрисовки. 
Их названия, разрмеры и т.д.
```
{
	name: "Название карты",
	background: "#000000", //Фон, который будет отображатся в местах, где не установлены блоки
	load: [0, 1], //Только данные объекты будут загружены
	data: [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
}
```

## Моды
Воу воу! Какие моды!? Я игру даже на половину еще не доделал 
а ты уже хочешь полную поддержку модов!? Они будут, 
но не летом. Это уж точно.

## Сборка проекта
##### На данный момент иструкция по сборке находится в разработке. Извините.