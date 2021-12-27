const tabs = ({
	tabsContainer, contentsContainer, tabActiveClass, contentActiveClass
}) => {
	const tabs = document.querySelectorAll(`${tabsContainer} [data-tab]`)
	const contents = document.querySelectorAll(`${contentsContainer} [data-tab]`)

	tabs.forEach(tab => {
		tab.addEventListener('click', function (e) {
			const name = tab.dataset.tab
			const content = document.querySelector(`${contentsContainer} [data-tab=${name}]`)

			tabs.forEach(tab => tab.classList.remove(tabActiveClass))
			contents.forEach(content => content.classList.remove(contentActiveClass))

			this.classList.add(tabActiveClass)
			content.classList.add(contentActiveClass)
			e.preventDefault()
		})
	})
}

export default tabs
