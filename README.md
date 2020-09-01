This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Code history

## 2. Создаем новое React приложение:

```sh
npm create-react-app

create-react-app todo-list

```

Запуск нового приложения:
```sh
npm start
```

## 3. React элементы
```js
	const a = <h1>Hi</h1>
```

> Создаются при помощи JSX
> Легковесные объекты - VirtualDOM
> ReactDOM.render() - превращает React элементы в обычные браузерные DOM элементы и рендерит их на странице.

## 4. React компоненты

```js
	const Header = () => {
		return <h1>Hi</h1>
	};
```

> Функции, которые возвращают React элемент
> Должны начинаться с большой буквы
> Имя затем можно использовать в JSX как будто это HTML тэг

## 5. JSX

> Позволяют использовать выражения {foo.bar}
> Аттрибуты называются camelCase'ом
> class = className, for = htmlFor
> В свойство можно передавать любое значение
> null, bundefined, true и false в теле тэгов игнорируются (не вызывая ошибок)

## 7. Структура React проекта

> Один компонент - один файл
> Помещаем все компоненты в папку components
> хорошие компоненты - независимые компоненты

## 8. Props - свойства компонентов

> Объект props передается в каждый компонент
```js
	const Comp = (props) => {
		return (
			<i> {props.name} </i>;
		)
	}
```
> Можно передавать любые значения ( не только строки )

## 9. Массивы, как свойства компонентов

> Массив можно передавать как свойство
> В JSX можно вставлять массивы элементов (не только по-одному)
> Можно передавать все свойства объекта в компонент используя Object Spread оператор ( не перечисляя каждый объект)

## 10. Коллекции и ключи

> Каждому JSX элементу в массиве нужно уникальное свойтво key
> React использует key чтобы эффективно сравнивать элементы при обновлении
> Не стоит делать ключи из индексов массивов

## 10. Импорт CSS

> CSS фреймворки (вроде Bootstrap) можно поключить в index.html
> CSS для компонентов удобно хранить в отдельных файлах:1 компонент = 1 CSS файл
> Webpack поддерживает импорт CSS файлов и Javascript модулей

## 12. Реструктура папок React проекта

> Файлы компонента удобно хранить в отдельной папке
> Кроме JS и CSS у компонента могут быть файлы с юнит-тестами и другими ресурсами
> Если в папке есть файл index.js, то он импортируется по-умолчанию

## 14.1 Компоненты-классы (stateful компоненты)

> Классы используются, когда нужно хранить состояние
> Классы наследуют React.Component
> Метод render() возвращает элемент (как в функциональном компоненте)
> props доступны через this.props

## 14.2 Обработка событий

> Добавить свойство OnClick (onBlur, onMouseOver, и т.д) к элементу
> Передать функцию
> Убедиться, что this сохранить правильное значение внутри функции (типичная ошибка)

```js
	onLabelClick() {
	    console.log(`Done: ${this.props.label}`)
	}
```
Выдаст ошибку this.props = undefined!

> Решаем проблему this.props = undefined с помощью класса конструктора

```js
   constructor() {
        super();
        this.onLabelClick = () => {
            console.log(`Done: ${this.props.label}`)
        }
    }
```

> или с помощью создания просто функции стрелки (работет только в последних версиях JS 2015++)

```js
	onLabelClick = () => {
		console.log(`Done: ${this.props.label}`)			
	};
```

## 14.3 State - состояние объектов

> Состояние храниться в поле state

> this.state инициализуруется в конструкторе или в теле класса

> После инициализации state нельзя изменять (только читать)

> Чтобы обновить (изменить) state - необходимо использовать метод setState();

```js 
	// Состояние храниться в поле state
   state = {
        done: false
    };

    // стрелочная функция для обработки нажания кнопки
    // используем синтаксис полей класса
    onLabelClick = () => {
		//Чтобы обновить (изменить) state - необходимо использовать метод setState();
        this.setState({
            done: true
        })
    }

    render() {
    const { label, important = false } = this.props;

    //this.state инициализуруется в конструкторе или в теле класса
    const { done } = this.state;

    let classNames = 'todo-list-item';
    if(done) {
        classNames += ' done';
    }
    return (
        <span className={classNames}>
	        <span className="todo-list-item-label" onClick={ this.onLabelClick }>
	            {label}
	        </span>
	    </span>    
    }
```
## 14.4 Как работает setState()

> В setState() нужно передавать только изменения в state.

```js
	onMarkImportant = () => {
	    this.setState({
	        important: true
	    })

	}
    render() {
    
    const { done, important } = this.state;

    let classNames = 'todo-list-item';
    if(important) {
        classNames += ' important';
    }

    return (
        <span className={classNames}>
            <button type="button"
                 className="btn btn-outline-success btn-sm float-right"
                onClick={this.onMarkImportant}>
              <i className="fa fa-exclamation" />
            </button>
        </span>
    );
}
```

## 14.5 Обновление состояния, которое зависит от предыдущего значения

> setState() принимает функцию
> аргумент - текущий state

```js
	this.setState((state) => {
		return {
			count: state.count + 1
		}
	});
````

> для того, чтобы избежать ошибок ассинхронной обработки данных. которые возникают при смене значений state, применяют  дополнительную функцию внутри основной функции.

Пример без обработки предыдущего значения:

```js
	onMarkImportant = () => {
	    this.setState({
	        important: !this.state.important
	    })

	}
````


Пример c обработкой предыдущего значения:
```js
    onMarkImportant = () => {
        this.setState(({important}) => {
            return {
                important: !important
            }
        });
    };
```
## 14.6 Собственная система событий
> Любой компонент может генерировать собственные события ( onDone, onAdded ...)

> Достаточно передать callback функцию, как property, а затем вызвать ее из компонента, когда наступило событие

>  Через события, данные поднимаются "ВВЕРХ" по иерархии компонентов

<App>			<--- todoData
	<AppHeader>
	<SearchPanel>
	<ItemStatusFilter>
	<TodoList>			<--- id
		<TodoListItem>	<--- Button 
		<TodoListItem>

## 14.7 SetState() - удаление объектов

> setState() не должен изменять текущий state

> методы которые изменяют (mutate) массив использовать нельзя

> newArr = [...oldArr.slice(0, idx),
			...oldArr.slice(idx + 1)];

> не изменяет oldArr
