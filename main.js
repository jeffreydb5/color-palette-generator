class Color {
  constructor(hex, element) {
    this.hex = hex
    this.element = element
    this.locked = false
  }

  setHex(hex) {
    this.hex = hex
    this.element.style.backgroundColor = hex
    this.element.querySelector('.color-input').value = hex
  }

  setLocked(locked) {
    this.locked = locked

    if (locked) {
      this.element.classList.add('locked')
      this.element.querySelector('img').src = './icons/lock-closed.svg'
    } else {
      this.element.classList.remove('locked')
      this.element.querySelector('img').src = './icons/lock-open.svg'
    }

    document.activeElement.blur()
  }

  toggleLocked() {
    this.setLocked(!this.locked)
  }

  generateHex() {
    if (this.locked) return

    const chars = '0123456789ABCDEF'
    let hex = '#'

    for (let i = 0; i < 6; i++) {
      hex += chars[Math.floor(Math.random() * 16)]
    }

    this.setHex(hex)
  }

  copyToClipboard() {
    const input = this.element.querySelector('.color-input')
    navigator.clipboard.writeText(input.value).then(() => {
      this.element.classList.add('copied')
      setTimeout(() => {
        this.element.classList.remove('copied')
      }, 1000)

      input.blur()
    })
  }
}

const color_elements = document.querySelectorAll('.colors .color')
const colors = []

// Generate different colors
for (let i = 0; i < color_elements.length; i++) {
  const color_element = color_elements[i]

  const input = color_element.querySelector('.color-input')
  const lock_toggle = color_element.querySelector('.lock-toggle')
  const copy_hex = color_element.querySelector('.copy-hex')

  const hex = input.value
  const color = new Color(hex, color_element)

  input.addEventListener('input', () => color.setHex(e.target.value))
  lock_toggle.addEventListener('click', () => color.toggleLocked())
  copy_hex.addEventListener('click', () => color.copyToClipboard())

  color.generateHex()
  colors.push(color)
}

function regenerateColors() {
  for (let i = 0; i < colors.length; i++) {
    colors[i].generateHex()
  }
}

document.querySelector('.generator-button').addEventListener('click', () => {
  regenerateColors()
})

document.addEventListener('keydown', (e) => {
  regenerateColors()
})
