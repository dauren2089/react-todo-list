# Документация к проекту TODO (Code history)
## 1. Настраиваем окружение
node, react, reactDOM, create-react-app, babel, webpack.

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
```JSON
<App>			<--- todoData
	<AppHeader>
	<SearchPanel>
	<ItemStatusFilter>
	<TodoList>			<--- id
		<TodoListItem>	<--- Button 
		<TodoListItem>
```

## 14.7 SetState() - удаление объектов

> setState() не должен изменять текущий state

> методы которые изменяют (mutate) массив использовать нельзя

```js
newArr = [...oldArr.slice(0, idx),
			...oldArr.slice(idx + 1)];
```

> не изменяет oldArr

## 14.8 SetState() - добавление элементов

> arr.push(newElement) - тоже изменение массива в state (нельзя выполнять на массивах хранимых в state)

> добавить элемент в конец массива 
```js
const newArr = [...oldArr, newItem]
```

>добавить элемент в начало массива 
```js
const newArr = [newItem, ...oldArr]
```

## 14.9 Проброс связей данных между компонентами

> Централизировать управление данными - хорошая практика 

> Если данные нужно использовать в нескольких компонентах - их нужно хранить в родительском компоненте

> Чтобы "Поднять" данные на вверх по иерархии компоенентов, используйте события!

Родительский компоненет APP.js
```js
	<TodoList
    onToggleImportant = { this.toggleImportant }
    onToggleDone = { this.toggleDone } />
````

Компонент по середине TODO-LIST.JS
```js
const TodoList = ({ onToggleImportant, onToggleDone }) => {
        return (
        <TodoListItem {...itemProps }
	     	onToggleImportant = { () => onToggleImportant(id) }
	    	onToggleDone = { () => onToggleDone(id) } />
		)
	}

```

исходный компонент TODO-LIST-ITEM.JS
```js
const TodoListItem = ({onToggleImportant, onToggleDone}) => {
		return(
			    <span className={classNames}>
                	<span className="todo-list-item-label"
                      	onClick={ onToggleDone }>
                        	{label}
                	</span>
	            	<button type="button float-right"
	                    onClick={ onToggleImportant }>
	                        <i className="fa fa-exclamation" />
	                </button>
                </span>
			)
```

## 14.10 SetState() - редактирование элементов

> oldObj нельзя изменять

> Но можно скопировать в новый объект
```js
	newObj = {...oldObj, prop: newValue};

	newArr = [...oldArr.slice(0, index),
				newObj,
			  ...oldArr.slice(index + 1)];
```

> Чтобы "Поднять" данные на вверх по иерархии компоенентов, используйте события!

## 14.10 Работа с формами

> используем onChange() чтобы получать текущее значение

> onSubmit() - событие отправки формы

> e.preventDefault() - чтобы страница не перезагружалась

```js
	<form className="item-add-form d-flex"
	        onSubmit={this.onSubmit}>
	    <input type="text"
	            className="form-control"
	            onChange={ this.onLabelChange }
	            placeholder="What needs to be done?"
	           value={this.state.label} />
	    <button
	        className="btn btn-info add-button">
	        Add Item
	    </button>
	</form>
```

## 14.10 Контролируемые компоненты

> Необходимо избегать не контролируемых компонентов. К примеру выше, форма ввода не обновлялась после ввода текста пользователем.
и связи между значениями State и формой отсутствовали.

> onChange() - обновляет state, а state обновляет value элемента 

> state - единственный источник значений

> легко обновлять value, можно обновлять не только в ответ на ввод пользователя.

## 15. Реализация функции поиска

> Компонент App получил новый элемент (term) в state, в котором мы будем хранить текст для поиска.

```js
    state = {
        term: ''
    };
```

> Перед тем, как отображать элементы в Render(), мы отфильтруем нужные элементы в функции фильтра.

```js
    search(items, term) {
    	// если еще нет совпадения и не введен текст, выводим весь массив элементов
        if (term.length === 0) {
            return items;
        }
        // если буква соответствует букве элемента, выводим соответствующие элементы
        return  items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }
```

>  Компонент SearchPanel генерирует событие OnSearchChange на каждое нажатие клавиши (чтобы App обновлял список).

> Используем "проброс" через компоненты для связи между ними

```js
    onSearchChange = (term) => {
        this.setState( { term } );
    }

    render() {
		const { todoData, term } = this.state;

        const visibleItems = this.search(todoData, term);

        return (
				<SearchPanel onSearchChange = { this.onSearchChange }/>
        	)
    }
```

## 17. Реализация поиска

> фильтры работают на 90% так же, как поиск 

> В компоненте ItemStatusFilter мы внесли описание кнопок в отдельный массив, чтобы не дублировать if'ы для каждой

> Текущая активная кнопка передается, как свойство. это продолжение идеи "Контролируемых компонентов".

### 1. добавляем в App.js функцию filterItem() для фильтрации элементом.
```js
	// принимает массив элементов ITEMS, и текущий включенный фильтр FILTER
    filterItems(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }    
```
### 2. устанавливаем новый параметр для state. Этот параметр будет обновлятся в результате нажатий кнопочек с нашего компонента ItemStatusFilter.
```js
state = {
	filter: 'all'
};
```

### 3. добавляем eventLintener в компоненту <ItemStatusFilter />.
> именно он обновляет состояние нашего компонента
```js
<ItemStatusFilter filter={filter} 
	onFilterChange = {this.onFilterChange} />
```

### 4. в файле item-status-filter.js определяем какая кнопка сейчас активна и делаем переборос на app.js
```js
    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    render() {
        const  { filter, onFilterChange } = this.props;
        
        const buttons = this.buttons.map(({ name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button key={name} type="button" className={"btn ${clazz}"} onClick={() => onFilterChange(name)}> {label}
                </button>
            );
        });
    }
```
