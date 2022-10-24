import { useEffect, useState } from "react"

export const useIdle = () => {
	const [once, setOnce] = useState(false)
	const [isIdleTimeout, setIsIdleTimeout] = useState(false)

	useEffect(()=> {
		!once && idle()
	}, [once])

	const idle = () => {
		let time: any

		const resetTimer = ():any => {
			clearTimeout(time)
			time = setTimeout(logout, 5000)
		}

		window.addEventListener('load', resetTimer, true)
		
		var events = ['mousedown', 'mousemove', 'keypress', 
		'scroll', 'touchstart']
		
		events.forEach(name => {
			document.addEventListener(name, resetTimer, true)
		})

		function logout() {
			localStorage.clear()
			setIsIdleTimeout(true)
		}

		setOnce(true)
	}

	return {isIdleTimeout}
}