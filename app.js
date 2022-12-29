const setTextColor = (color) => {
	return chroma(color).luminance() > 0.5 ? 'black' : 'white'
}

const setRandomColors = () => {
	const cols = document.querySelectorAll('.col')

	cols.forEach((col) => {
		const isLocked = col.querySelector('button').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const button = col.querySelector('button')

		if (!isLocked) {
			const color = chroma.random()

			// меняем background
			col.style.background = color

			// записываем значение в h2
			text.textContent = color

			// меняем цвет h2
			text.style.color = setTextColor(color)

			// меняем цвет button
			button.style.color = setTextColor(color)
		}

	})
}

const copyToClickboard = (text) => {
	return navigator.clipboard.writeText(text)
}

document.addEventListener('keydown', (event) => {
	event.preventDefault()
	if (event.code === 'Space') {
		setRandomColors()
	}
})


document.addEventListener('click', (event) => {
	const type = event.target.dataset.type
	const tagName = event.target.tagName

	if (type === 'lock' && tagName === 'BUTTON') {
		const node = event.target

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')

	} else if (type === 'copy') {
		copyToClickboard(event.target.textContent)
	}
})

const Render = () => {
	const root = document.getElementById('root')
	const COUNT = 8 // можно менять
	const Nodes = []

	// Подготовим нужные элементы
	for (let i = 0; i < COUNT; i++) {
		// Создаем div
		const Element = document.createElement('div')
		Element.classList.add('col')

		// Создаем кнопку
		const ButtonLock = document.createElement('button')
		ButtonLock.classList.add('fa-solid', 'fa-lock-open')
		ButtonLock.dataset.type = 'lock'

		// Создаем h2
		const Title = document.createElement('h2')
		Title.dataset.type = 'copy'

		Element.appendChild(Title)
		Element.appendChild(ButtonLock)

		Nodes.push(Element)
	}

	// Добавляем все в <div id="root"></div>
	root.append(...Nodes)
}

// создаем элементы в DOM
Render()

// Закрашиваем
setRandomColors()