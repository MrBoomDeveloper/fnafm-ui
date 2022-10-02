let matchmaking = false, was_id = 0, pass_was = 0, native = true, results = "["

const main = {
	load() {
		if(!cookies.get("firstLaunch")) {
			boom.log("first launch")
			for(const setting of default_settings) { 
				cookies.set(setting[0], setting[1])
			}
			new BoomDialog("dialog-welcome").tip({
				title: "Welcome to FNaF Multiplayer",
				content: "The game is currently in alpha testing. This means that there may be bugs and at any time your game profile may be deleted from the database.",
				icon: "ic_coin.png"
			})
		}
		
		if(updates.length > cookies.get("was_updates")) {
			new BoomDialog("dialog-updated").text(updates[updates.length - 1])
			cookies.set("was_updates", updates.length)
		}
		
		if(window.location.hash == "#android") {
			cookies.set = function(key, value) {
				click.play()
				localStorage.setItem(key, value)
				android.set(key, value)
			}
		} else {
			window.android = {
				play() {
					return false
				},
				edit_profile() {
					return false
				},
				logout() {
					return false
				},
				go() {
					return false
				},
				set() {
					return false
				}
			}
		}
		load_other()
	},
	
	refresh(delay) {
		let pager = element("#pager")
		pager.classList.add("reveal")
		setTimeout(() => pager.classList.remove("reveal"), delay)
	},
	
	popup(page) {
		click.play()
		let back_btn = element("#popup #back")
		for(const obj of elements("#popup main section")) {
			obj.style.display = "none"
		}
		element("#popup").classList.remove("reveal")
		this.popTab(page, back_btn)
	},
	
	closePopup() {
		click.play()
		element('#popup').classList.add('reveal')
	}
}

BoomDialog.prototype.tip = function(args) {
	const { title, content, icon } = args
	this.show(`<div class='content tip'><img src="./images/${icon}"/><div class="about">
		<h2>${title}</h2><p>${content}</p><button neon class="close">Continue</button>
	</div>`)
}

function play(btn) {
	click.play()
	matchmaking = true
	setTimeout(() => {
		if(android.play() == 0) matchmaking = false
	}, 1000)
	element("#home-page .actions button:first-child").disabled = true
	let dots_count = 0
	let btn_html = ""
	
	let play_btn_anim = setInterval(() => {
		if(matchmaking) {
			btn_html = "Matchmaking"
			dots_count++
			if(dots_count > 3) dots_count = 0
			for(let i = 0; i < dots_count; i++) {
				btn_html += "."
			}
			btn.innerHTML = btn_html
			btn.classList.add("active")
		} else {
			boom.error("No game found")
			element("#home-page .actions button:first-child").disabled = false
			btn.innerHTML = "Start Game"
			btn.classList.remove("active")
			clearInterval(play_btn_anim)
		}
	}, 750)
}

const gm = {
	load() {
		let html = ""
		this.array.forEach((obj, i) => {
			html += `<card-layers class="gm" clickable banner="./images/${obj.banner}" onclick="gm.tab(${i})">`
			html += `<h3>${obj.name}</h3></card-layers>`
		})
		element("#modes-page").innerHTML = html
		this.tab(1)
	},
	
	tab(id) {
		if(matchmaking) return
		const obj = this.array[id]
		let banner = element("#home-page")
		banner.style.backgroundImage = `
			linear-gradient(90deg, 
				var(--background) 0%, 
				rgba(0, 0, 0, 0) 10%),
			url('./images/${obj.banner}')
		`
		this.resize(id, banner)
		element("#home-page h1").innerHTML = obj.name
		element("#home-page #tags #time").innerHTML = obj.time + " minutes"
		element("#home-page #tags #players").innerHTML = obj.players + " players"
		element("#home-page p").innerHTML = obj.description
		element("#popup").className = "reveal"
		main.refresh(200)
	}
}

const char = {
	load() {
		let html = ""
		this.tabs.forEach((obj, i) => {
			html += `<input type="radio" onclick="char.tab(${i})" name="char" id="${obj[1]}" value="${obj[1]}`
			html += i == 0 ? `" checked>` : "\">"
			html += `<label for="${obj[1]}"><card-simple google icon="${obj[0]}"></card-simple></label>`
		})
		element("#cats").innerHTML = html
		html = ""
		for(let i = 0; i < 25; i++) {
			html += `<card-simple clickable icon="./images/${"ui_pass_trump_freddy_icon.png"}"></card-simple>`
		}
		element("#inventory").innerHTML = html
		this.tab(0)
	},
	tab(id) {
		element("#character-page .info h1").innerHTML = this.tabs[id][1]
	}
}

const pass = {
	load: function(count) {
		let html = ""
		/*this.array.forEach((obj, i) => {
			//UPDATE PLEASE THIS BULLSHIT
			html += `<input class="rewardo" type="radio" onclick="pass.click(${i})" name="season_pass" id="reward${i}" value="reward` + i
			html += i == 0 ? `" checked="checked">` : `">`
			html += "<label for=\"reward" + i + "\" class=\"reward\"><img class=\"back\" src=\"./images/ui_pass_level.png\"/><img "
			html += "class=\"icon\" src=\"./images/ui_pass_trump_freddy_icon.png\"/><h6>" + (i + 1) + "</h6></label>"
		})*/
		
		
		
		for(let i = 0; i < count; i++) {
			html += `<input class="rewardo" type="radio" onclick="pass.click(${i})" name="season_pass" id="reward${i}" value="reward` + i
			html += i == 0 ? `" checked="checked">` : `">`
			html += "<label for=\"reward" + i + "\" class=\"reward\"><img class=\"back\" src=\"./images/ui_pass_level.png\"/><img "
			html += "class=\"icon\" src=\"./images/ui_pass_trump_freddy_icon.png\"/><h6>" + (i + 1) + "</h6></label>"
		}
		element("#rewards div").innerHTML = html
	},
	
	click: function(id) {
		click.play()
		if(pass_was == id)
			boom.warn("You don't have this level")
		pass_was = id
	}
}

const shop = {
	load() {
		let html = ""
		for(let i in this.content) {
			if(!(i == 0 && this.content[0][0] == 999)) {
				html += `<div class="group"><div class="header"><h1>${this.tabs[i]}</h1><span></span></div>`
				for(let i1 in this.content[i]) {
					let item = items[i][this.content[i][i1]]
					html += `<card-layers class="offer ${i == 0 ? "big" : "small"}" banner="./images/${item.banner}">`
					html += `<h4>${item.name}</h4><button neon onclick="shop.buy(${i})"><img src="./images/ic_${item.cost_type}.png"/>`
					html += `<span>${item.cost_amount}</span></button></card-layers>`
				}
				html += "</div>"
			} else { boom.log("hide offer") }
		}
		element("#shop-page").innerHTML = html
		let timers = elements("#shop-page .header span")
		setInterval(() => {
			for(let i in timers) {
				timers[i].innerHTML = (i + 1) != timers.length ? this.timers(i) : "&#10240;"
			}
		}, 1000)
	},
	
	buy(item) {
		if(1 >= 2) {
			boom.warn("This item is not available in your country")
		} else {
			boom.error("You dont have enough money")
		}
	},
	generate() {
		date = new Date()
		
		//Generate a special offer
		id = date.getWeek() * 1.7
		while(id > items[0].length) {id -= items[0].length}
		id = Math.round(id)
		if(id >= items[0].length) id = 999
		this.content[0][0] = id
		boom.log("Special offer id is " + id)
		
		//Generate suits and boosts
		for(let i = 0; i < 2; i++) {
			for(let i1 = 0; i1 < 4; i1++) {
				id = date.getDate() + date.getDay() + 2 * i1 + i1
				while(id >= items[i + 1].length) { id  -= items[i + 1].length }
				this.content[i + 1][i1] = id
			}
		}
		
		//Load currencies
		for(const i in items[3]) { this.content[3][i] = i }
		this.load()
	},
	timers(group) {
		let date = new Date()
		if(group == 0) {
			let result = (7 - date.getDay()).zeros() + ":" + (23 - date.getHours()).zeros() + ":" + (59 - date.getMinutes()).zeros() + ":"
			return  result + (59 - date.getSeconds()).zeros()
		} else {
			let result = ((23 - date.getHours()).offset(5 * group)).zeros(); + ":" + (59 - date.getMinutes()).zeros() + ":"
			return result + ":" + (59 - date.getSeconds()).zeros()
		}
	}
}

const profile = {
	load() {
		boom.log("Logged in as MrBoomDev")
		element(".profile").classList.remove("reveal")
		let html = ""
		for(let stat of this.stats) {
			html += "<div><h1>" + stat.value + "</h1><p>" + stat.name + "</p></div>"
		}
		element("#stats").innerHTML = html
		element("header ul").classList.remove("reveal")
	},
	
	edit(nick, pfp) {
		if(!android.edit_profile(nick, pfp)) { 
			boom.error(text.feature)
			return
		}
		alert("Task completed", "Profile has changed successfully")
	}
}

const nav = {
	load() {
		let tabs_element = element("aside")
		let html = ""
		for(const tab of nav.tabs) {
			html += `<input type="radio" onclick="nav.tab(${tab.id})" name="tab" id="${tab.name}" value="${tab.name}"`
			html += (tab.id == 0) ? ` checked="checked">` : ">"
			html += `<label for="${tab.name}" class="${tab.class}"><span class="material-symbols-outlined">${tab.icon}`
			html += `</span><span>${tab.name}</span></label>`
		}
		tabs_element.innerHTML = html
		tabs_element.classList.remove("reveal")
	},
	
	tab(id) {
		if(id != was_id) {
			main.refresh(500)
			setTimeout(() => {
				let tabso = elements("#app main section")
				for(tab of tabso) {
					tab.style.display = "none"
				}
				this.display(tabso, id)
			}, 200)
			was_id = id
		}
	}
}

function load_other() {
	nav.load()
	gm.load()
	char.load()
	pass.load(30)
	shop.generate()
	profile.load()
	main.refresh(500)
	element("#logs-page").innerHTML = updates.join()
	
	//Load about page
	
	let html = ""
	for(const list of about) {
		for(item of list) {
			switch (item.name) {
				case "start": html += `<div class="info"><h1>${item.title}</h1>`
					break
				case "end": html += "</div>"
					break
				default: html += `<card-small onclick="android.go('${item.link}')" clickable title="${item.name}" description="${item.description}"></card-small>`
					break
			}
		}
	}
	element("#about-page").innerHTML = html;
	
	//Load settings page
	
	html = ""
	for(const sets of settings) {
		html += `<h3>${sets.title}</h3>`
		for(set of sets.content) {
			html += `<card-setting title="${set.title}" description="${set.description}" key="${set.key}"></card-setting>`
		}
	}
	element("#settings-page").innerHTML = html
}

const gameover = {
	animate() {
		const header = element("#gameover-page .header")
		results = JSON.parse(decodeURI(location.param("results")))
		let html = ""
		for(const object of results) {
			html += `<li><span>${object[0]}</span>
			<span>${object[1]}</span></li>
			<hr color="#FFFFFF"/>`
		}
		
		element("#gameover-page ul").innerHTML = html
		element("#gameover-page h1").innerHTML = param("win") == "true" ? "You Win!" : "You Loose"
		header.classList.add("active")
		header.addEventListener("animationend", () => {
			setTimeout(() => element("#gameover-page ul").classList.add("active"), 150)
			setTimeout(() => element("#gameover-page #actions").classList.add("active"), 1500)
		})
	}
}