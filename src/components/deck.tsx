import { Card } from "./card"
import images from "../data/images.json"
import { useState, useEffect, useCallback } from "react"

export const Deck = () => {
  const [movedCards, setMovedCards] = useState<number[]>([])
  const handleCardMoved = useCallback(
    (index: number) => {
      if (!movedCards.includes(index)) {
        setMovedCards((prev) => [...prev, index])
      }
    },
    [movedCards],
  )

  useEffect(() => {
    const checkCardMovement = () => {
      const cards = document.querySelectorAll(".card-container")
      cards.forEach((card, index) => {
        if (movedCards.includes(index)) return
        const cardElement = card.querySelector("div")
        if (cardElement && cardElement.classList.contains("ml-[calc(100vw-45vw)]")) {
          handleCardMoved(index)
        }
      })
    }
    const interval = setInterval(checkCardMovement, 500)
    return () => clearInterval(interval)
  }, [movedCards, handleCardMoved])

  return (
    <div className="relative h-screen w-full">
      <div className="absolute">
        {images.map((image, index) => {
          const isTopCard = index === movedCards.length
          const hasBeenMoved = movedCards.includes(index)
          const moveIndex = movedCards.indexOf(index)

          return (
            <div
              key={image.id}
              className={`absolute card-container transition-all duration-0`}
              style={{
                zIndex: hasBeenMoved ? images.length + moveIndex : images.length - index,
                left: hasBeenMoved ? `calc(100vw - 100vw + ${moveIndex * 10}px)` : `${index * 5}px`,
                top: hasBeenMoved ? `${moveIndex * 10}px` : `${index * 5}px`,
                pointerEvents: isTopCard ? "auto" : "none",
              }}
            >
              <Card image={image.image} />
            </div>
          )
        })}
      </div>
    </div>
  )
}