document.addEventListener("DOMContentLoaded", function(event) { 

	let inputs = document.querySelectorAll('.inputfile');
	Array.prototype.forEach.call(inputs, function (input) {
		let label = input.nextElementSibling,
		labelVal = label.innerHTML;
		input.addEventListener('change', function (e) {
			let fileName = '';
			if (this.files && this.files.length > 1)
				fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
			else
				fileName = e.target.value.split('\\').pop();
			if (fileName)
				label.innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});

	let phoneInput = document.getElementById('phone-mask');
	if (phoneInput) {
		let maskOptions = {
			mask: '+{7} 000 000 00 00'
		};
		let mask = IMask(phoneInput, maskOptions);
	}	

	let acceptEdits = document.querySelector(".chat-btns__item.-accept");	
	if (acceptEdits) {
		acceptEdits.addEventListener("click", function(event) {
			event.preventDefault();
			let chatBtns = document.querySelector(".chat-btns"),
			chatSuccess = document.querySelector(".chat__success");
			chatBtns.classList.remove("-show");
			chatSuccess.classList.add("-show");
		});
	}	

	let declineEdits = document.querySelector(".chat-btns__item.-decline");
	let chatAnswer = document.querySelector(".chat-answer");
	if (declineEdits) {
		declineEdits.addEventListener("click", function(event) {
			event.preventDefault();		
			this.classList.add("-inactive");
			chatAnswer.classList.add("-show");
		});
	}	

	if (chatAnswer) {
		chatAnswer.addEventListener("submit", function(event) {
			event.preventDefault();
			let chatBtns = document.querySelector(".chat-btns");
			chatBtns.classList.remove("-show");
			this.classList.remove("-show");
		});
	}	

	let removeBasketItem = document.querySelectorAll(".basket-item__remove > a");
	if (removeBasketItem) {
		removeBasketItem.forEach(element => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement.parentElement;
				item.remove();
				let countBasketItems = document.querySelectorAll(".basket-item").length;
				if (countBasketItems === 0) {
					let basketList = document.querySelector(".basket__list"),
						backetBottom = document.querySelector(".basket__bottom"),
						basketBack = document.querySelector(".basket__back");
					basketList.classList.add("-hidden");
					backetBottom.classList.add("-hidden");
					basketBack.classList.add("-show");
					document.querySelector(".basket__title").innerHTML = "Ваша корзина пуста";
				}
			});
		});
	}	

	let basketClear = document.querySelector(".basket__clear");
	if (basketClear) {
		basketClear.addEventListener("click", function(event) {
			event.preventDefault();
			let basketItems = document.querySelectorAll(".basket-item");
			basketItems.forEach((element) => {
				element.remove();
			});
			let basketList = document.querySelector(".basket__list"),
				backetBottom = document.querySelector(".basket__bottom"),
				basketBack = document.querySelector(".basket__back");
			basketList.classList.add("-hidden");
			backetBottom.classList.add("-hidden");
			basketBack.classList.add("-show");
			document.querySelector(".basket__title").innerHTML = "Ваша корзина пуста";
		});
	}

	let editUser = document.querySelectorAll(".user-management__btn.-edit");
	if (editUser) {
		editUser.forEach((element) => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement.parentElement;
				let inputs = item.querySelectorAll("input");
				let btns = item.querySelectorAll(".user-management__btn");
				inputs.forEach((input) => {
					input.removeAttribute("disabled");
				});
				btns[0].classList.remove("-active");
				btns[1].classList.remove("-active");
				btns[2].classList.add("-active");
				btns[3].classList.add("-active");
			});
		});
	}

	let cancelUser = document.querySelectorAll(".user-management__btn.-cancel");
	if (cancelUser) {
		cancelUser.forEach((element) => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement.parentElement;
				let inputs = item.querySelectorAll("input");
				let btns = item.querySelectorAll(".user-management__btn");
				inputs.forEach((input) => {
					input.setAttribute("disabled", "disabled");
				});
				btns[0].classList.add("-active");
				btns[1].classList.add("-active");
				btns[2].classList.remove("-active");
				btns[3].classList.remove("-active");
			});
		});
	}

	let deleteUser = document.querySelectorAll(".user-management__btn.-delete");
	if (deleteUser) {
		deleteUser.forEach((element) => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement.parentElement;
				item.remove();
				let countItems = document.querySelectorAll(".user-management__item").length;
				if (countItems === 0) {
					document.querySelector(".user-management__title").innerHTML = "Вы не добавили ни одного сотрудника";
				}
			});
		});
	}

	let changeProfile = document.querySelectorAll(".profile-info__change");
	if (changeProfile) {
		changeProfile.forEach((element) => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement;
				let otherItems = document.querySelectorAll(".profile-info__item");
				otherItems.forEach((element) => {
					element.classList.remove("-active");
				});
				item.classList.add("-active");
			});			
		});
	}

	let cancelProfile = document.querySelectorAll(".profile-form__cancel");
	if (cancelProfile) {
		cancelProfile.forEach((element) => {
			element.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement.parentElement.parentElement;
				item.classList.remove("-active");
			});
		});
	}

	let profileForm = document.querySelectorAll(".profile-form");
	if (profileForm) {
		profileForm.forEach((element) => {
			element.addEventListener("submit", function(event) {
				event.preventDefault();
				let item = this.parentElement,
					value = this.querySelector("input").value;
					content = item.querySelector(".profile-info__value");
				if (element.id !== "form-password") {
					content.innerHTML = value;
				}				
				item.classList.remove("-active");
			});
		});
	}

	let addCard = document.querySelector(".profile-pay__add");
	if (addCard) {
		addCard.addEventListener("click", function(event) {
			event.preventDefault();
			let overlay = document.querySelector(".profile-pay__overlay");
			let modalCard = document.querySelector(".profile-pay-modal");
			overlay.style.display = "block";
			overlay.classList.add("animate__animated", "animate__fadeIn");
			setTimeout(function() {
				modalCard.style.display = "block";
				modalCard.classList.add("animate__animated", "animate__fadeIn");
			}, 500);
		});
	}

	let overlayCard = document.querySelector(".profile-pay__overlay");
	if (overlayCard) {
		overlayCard.addEventListener("click", function() {
			closeModalCard();
		});
	}

	let btnCloseModalCard = document.querySelector(".profile-pay-modal__close");
	if (btnCloseModalCard) {
		btnCloseModalCard.addEventListener("click", function(event) {
			event.preventDefault();
			closeModalCard();
		});
	}

	let saveNewCard = document.querySelector(".profile-pay-modal");
	if (saveNewCard) {
		saveNewCard.addEventListener("submit", function(event) {
			event.preventDefault();
			let emptyBlock = document.querySelector(".profile-pay__empty");
			let cardList = document.querySelector(".profile-pay__list");
			emptyBlock.classList.add("-hidden");
			cardList.classList.remove("-hidden");
			// Создание карточки карты
			let divCard = document.createElement("div");
			let imgCard = document.createElement("img");
			let nameCard = document.createElement("span");
			let btnCloseCard = document.createElement("a");
			let btnCloseImgCard = document.createElement("img");
			divCard.classList.add("profile-pay__item");
			imgCard.setAttribute("src", "img/bank-card.svg");
			nameCard.innerHTML = "*9900";
			nameCard.classList.add("name");
			btnCloseCard.classList.add("close");
			btnCloseImgCard.setAttribute("src", "img/card-delete.svg");
			btnCloseCard.append(btnCloseImgCard);
			divCard.append(imgCard);
			divCard.append(nameCard);
			divCard.append(btnCloseCard);

			btnCloseCard.addEventListener("click", function(event) {
				event.preventDefault();
				let item = this.parentElement;
				item.remove();
				let countItems = document.querySelectorAll(".profile-pay__item").length;
				if (countItems === 0) {
					emptyBlock.classList.remove("-hidden");
					cardList.classList.add("-hidden");
				}
			});
			//  Конец создания карточки карты			
			cardList.append(divCard);
			this.reset();
			closeModalCard();
		});
	}

	window.addEventListener("resize", changeSizePhoto);
	window.addEventListener("load", changeSizePhoto);

	window.addEventListener("resize", initScrollBar);
	window.addEventListener("load", initScrollBar);

	let historyTabs = document.querySelectorAll('.history-tabs');
	if (historyTabs) {
		historyTabs.forEach((element) => {
			element.addEventListener('click', changeItemInfo);
		});
	}

	let historyItems = document.querySelectorAll('.history-tbody__short');
	if (historyItems) {
		historyItems.forEach((element) => {
			element.addEventListener('click', openItemHistory);
		});
	}

});

function initScrollBar() {
	if (window.innerWidth < 1540) {
		let reviewTable = document.querySelector(".my-office-review");
		if (reviewTable) {
			new SimpleBar(reviewTable);
		}		
	}	
}

function closeModalCard() {
	let overlay = document.querySelector(".profile-pay__overlay");
	let modalCard = document.querySelector(".profile-pay-modal");
	modalCard.classList.add("animate__fadeOut");
	setTimeout(function() {
		modalCard.style.display = "none";
		modalCard.classList.remove("animate__animated", "animate__fadeIn", "animate__fadeOut");
		overlay.classList.add("animate__fadeOut");
		setTimeout(function() {
			overlay.style.display = "none";
			overlay.classList.remove("animate__animated", "animate__fadeIn", "animate__fadeOut");
		}, 500);
	}, 500);
}

function changeSizePhoto() {
	let photo = document.querySelectorAll(".my-office-tbody__td.-photo, .history-tbody__td.-photo");
	if (photo) {
		photo.forEach((element) => {
			let width = element.clientWidth;
			element.style.height = width + "px";
		});
	}	
}

function changeItemInfo(event) {
	let targ = event.target;
	if (targ.classList.contains("-download")) return; 
	event.preventDefault();
	if (targ.classList.contains('-active')) {
		hideAllItemInfo();
	} 
	else {
		hideAllItemInfo();
		targ.classList.add('-active');
		let tab = targ.getAttribute("data-tab");
		let div;
		switch(tab) {
			case "history":
				div = document.querySelector(".history-more-edits");
				div.classList.add("-open");
				showDiv(div);
				break;
			case "layouts":
				div = document.querySelector(".history-more-layouts");
				div.classList.add("-open");
				showDiv(div);
				break;
		}	
	}
}

function hideAllItemInfo() {
	let historyTabs = document.querySelectorAll(".history-tabs__item");
	let divEdits = document.querySelector(".history-more-edits");
	let divHistory = document.querySelector(".history-more-layouts");

	historyTabs.forEach((element) => {
		element.classList.remove("-active");
	});

	divEdits.style.height = "0";
	divHistory.style.height = "0";

	divEdits.classList.remove("-open");
	divHistory.classList.remove("-open");
}

function openItemHistory(event) {
	let element = this.parentElement;
	if (element.classList.contains('-active')) {
		hideAllItemHistory();
	} 
	else {
		hideAllItemHistory();
		element.classList.add('-active');
		let moreInfo = element.querySelector(".history-more");
		moreInfo.classList.add("-open");
		showDiv(moreInfo);
	}
}

function hideAllItemHistory() {
	let items = document.querySelectorAll(".history-tbody__item");
	items.forEach((element) => {
		let moreInfo = element.querySelector(".history-more");
		moreInfo.style.height = "0";
		moreInfo.classList.remove("-open");
		element.classList.remove("-active");
	});
};

function showDiv(divEl) {
	divEl.style.height = divEl.scrollHeight + 'px';
}