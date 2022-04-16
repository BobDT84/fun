function Popup() {

    createPopup(
        popupMessages = ['No Message'],
        buttons = [{ text: 'Close', onClick: (element) =>{element.remove()}, onClickTarget: 'self'}],
        appendTo = document.getElementById('layer1')
        ) {
          let popup = document.createElement('div');
          popup.className = 'popup-window';
  
          for (let popupMessage of popupMessages) {
              let message = document.createElement('p');
              message.className = 'popup-message';
              message.innerText = popupMessage;
              popup.appendChild(message);
          }
  
          let buttonContainer = document.createElement('div');
          buttonContainer.className = 'popup-buttons';
          for (let button of buttons) {
              let newButton = document.createElement('div');
              newButton.className = 'button popup-button';
              newButton.innerText = button.text;
              let target;
              if(button.onClickTarget == 'self'){
                  target = popup;
              } else {
                  target = button.onClickTarget;
              }
              newButton.addEventListener('click', (e) =>{button.onClick(target)});
              buttonContainer.appendChild(newButton);
          }
          popup.appendChild(buttonContainer);
          appendTo.appendChild(popup);
      }


}

export { Popup };