import '../../button/button'
import './hero-info.styl'

class heroInfo {
	static init() {
		const button = document.querySelector('[data-action=hello-action]')

		button.addEventListener('click', function(e) {
			e.preventDefault()
			console.log('Hello!');
		})
	}
}
export default heroInfo
