const element = query => document.querySelector(query)
const elements = query => document.querySelectorAll(query)
const go = url => window.open(url, "_blank")

const cookies = {
	set: (key, value) => localStorage.setItem(key, value),
	get: key => localStorage.getItem(key)
}

const boom = {
	online: false, loaded: false,

	reveal: function(query) {
		const reveals = elements(query || ".reveal")
		for(const el of reveals) {
			if (el.getBoundingClientRect().top < window.innerHeight)
				el.classList.add("revealed")
		}
	},

	loadDesign: () => {
		if(!boom.online) console.error("Please, connect to the internet!")
		const link = document.createElement("link")
		link.rel = "stylesheet"
		link.href = "https://mrboomdeveloper.github.io/css/boom.css"
		element("head").appendChild(link)
		console.log("BoomDesign was applied succesfully")
	},

	alert: function(title, description, time) {
		const message = document.createElement("card-small")
		message.setAttribute("title", title)
		message.setAttribute("description", description || "")
		element("#messages").appendChild(message)
		
		new Promise(next => setTimeout(() => next(), 200)).then(() => {
			message.className = "active";
			setTimeout(() => {
				message.className = "destroy"
				setTimeout(() => message.remove(), 250)
			}, time || 2500)
		})
	},

	log: text => boom.alert("Console Log", text, 2000),
	error: text => boom.alert("An error has occurred", text, 5000),
	warn: text => boom.alert("Sorry", text, 3000),
	dialog: (text, id) => new BoomDialog(`dialog-debug-${id}`).text(`<p>${text}</p>`)
}

class BoomDialog {
	constructor(id) { this.id = id }
	show(html) {
		console.log(`Show dialog with id ${this.id}`)
		const dia = document.createElement("div")
		dia.id = this.id
		dia.className = "dialog"
		dia.innerHTML = html
		element("body").appendChild(dia)
		element(`#${this.id} .close`).addEventListener('click', (() => this.close(this.id)))
		setTimeout(() => dia.classList.add("active"), 100)
	}
	close() {
		const dia = element(`#${this.id}`)
		dia.classList.remove("active")
		setTimeout(() => dia.remove(), 200)
	}

	text(txt) {
		this.show(`<div class="content text">${txt}<button neon class="close">Continue</button></div>`)
	}
}

Number.prototype.zeros = function() {
	return this > 9 ? this : "0" + this
}

Number.prototype.offset = function(n) {
	let result = this + n
	if (result > 23) {
		return (result - 24)
	} else {
		return result
	}
}

Date.prototype.getWeek = function() {
	let onejan = new Date(this.getFullYear(), 0, 1)
	let today = new Date(this.getFullYear(), this.getMonth(), this.getDate())
	let dayOfYear = ((today - onejan + 86400000)/86400000)
	return Math.ceil(dayOfYear/7)
}

Number.prototype.isEven = function() {
	return this % 2 == 0
}

String.prototype.insert = function(index = 0, string) {
	if (index > 0) return this.substring(0, index) + string + this.substr(index)
	return string + this
}

location.param = name => {
	const params = new URL(location).searchParams
	const result = params.getAll(name).toString()
	return result == "" ? undefined : result
}

window.addEventListener("offline", () => {
	boom.online = false
	boom.error("Internet connection was lost")
})

window.addEventListener("online", () => {
	boom.online = true
	boom.alert("Back online", "Internet connection has been restored", 3500)
})

window.addEventListener("error", () => boom.error("Please check the console"))

window.addEventListener("load", () => {
	let messages = document.createElement("div")
	messages.id = "messages"
	document.body.appendChild(messages)
	boom.loaded = true
})


//Custom elements

class CardProduct extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div>
		<img class="banner" src="${this.getAttribute("banner")}" title="${this.getAttribute("title")}" alt="${this.getAttribute("title")}"/>
		<div class="about">
		<h3>${this.getAttribute("title")}</h3>
		<span>${this.getAttribute("tags")}</span>
		<p>${this.getAttribute("description")}</p>
		</div>
		</div>`
	}
}

class CardButton extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div>
		<div class="about">
		<h2>${this.getAttribute("title")}</h2>
		<p>${this.getAttribute("description")}</p>
		</div>
		<span>&#62;</span>
		</div>`
	}
}

class CardSimple extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		let html = ""
		if (this.getAttribute("google") == undefined) {
			html = `<img src="${this.getAttribute("icon")}" `
			if (this.getAttribute("icon") != undefined) html += `title="${this.getAttribute("title")}"`
			html += "/>"
		} else {
			html = `<span class="material-symbols-outlined">${this.getAttribute("icon")}</span>`
		}
		this.innerHTML = html
	}
}

class CardIcon extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div>
		<img src="${this.getAttribute("icon")}" title="${this.getAttribute("title")}" alt="${this.getAttribute("title")}"/>
		<h6>${this.getAttribute("title")}</h6>
		</div>`
	}
}

class CardColor extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<p>${this.getAttribute("code")}</p>`
		this.style.backgroundColor = this.getAttribute("code")
	}
}

class CardLayers extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div>
		<img class="banner" src="${this.getAttribute("banner")}"/>
		<div class="shadow"></div>
		<div class="about">${this.innerHTML}</div>
		</div>`
	}
}

class InputSwitch extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		let html = ""
		const key = this.getAttribute("key")
		html = `<label for="${key}_switch" class="switch"><input type="checkbox" `
		if (cookies.get(key)) html += "checked "
		html += `name="${key}_switch" value="${key}_switch" id="${key}_switch"
		onchange="cookies.set('${key}', event.currentTarget.checked)">
		<span class="slider"></span></label>`
		this.innerHTML = html
	}
}

class CardRating extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div><h3>${this.getAttribute("score")}</h3>
		<h2>${this.getAttribute("title")}</h2></div>`
	}
}

class CardSmall extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div><h4>${this.getAttribute("title")}</h4>
		<p>${this.getAttribute("description")}</p></div>`
	}
}

class CardSetting extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		this.innerHTML = `<div><div class="text">
		<h4>${this.getAttribute("title")}</h4><p>${this.getAttribute("description")}</p></div>
		<input-switch key="${this.getAttribute('key')}" checked="${cookies.get(this.getAttribute('key'))}"></input-switch></div>`
	}
}

class CardFaq extends HTMLElement {
	constructor() { super() }
	connectedCallback () {
		const name = this.id
		this.innerHTML = `
		<button class="accordion" id="faq1_${name}">${this.getAttribute("title")}</button>
		<div class="panel" id="faq2_${name}"><p>${this.getAttribute("description")}</p></div>`

		let active = false
		this.addEventListener('click', () => {
			this.classList.toggle("active")
			const child = element(`#faq2_${name}`)
			child.classList.toggle("active")
			if (active) {
				child.style.maxHeight = null
				active = false
			} else {
				child.style.maxHeight = child.scrollHeight + "px"
				active = true
			}
		})
	}
}

customElements.define("card-setting", CardSetting)
customElements.define("card-product", CardProduct)
customElements.define("card-button", CardButton)
customElements.define("card-simple", CardSimple)
customElements.define("card-icon", CardIcon)
customElements.define("card-color", CardColor)
customElements.define("card-layers", CardLayers)
customElements.define("input-switch", InputSwitch)
customElements.define("card-rating", CardRating)
customElements.define("card-small", CardSmall)
customElements.define("card-faq", CardFaq)