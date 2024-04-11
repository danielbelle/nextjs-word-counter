"use client";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const inputElement = document.querySelector("textarea")
    const wordsELement = document.querySelector("#words-stat")
    const letterElement = document.querySelector("#letters-stat")
    const sentencesElement = document.querySelector("#sentences-stat")
    const paragraphsElement = document.querySelector("#paragraphs-stat")
    const readingTimeElement = document.querySelector("#reading-time-stat")
    const speakingTimeElement = document.querySelector("#speaking-time-stat")
    const keywordsListElement = document.querySelector("#keyword-list")

    inputElement.addEventListener("input", handleInput)

    function handleInput(event) {
      letterElement.textContent = countLetters(event.target.value)
      wordsELement.textContent = countWords(event.target.value).WordsNum
      sentencesElement.textContent = countSentences(event.target.value)
      readingTimeElement.textContent = countReadingTime(event.target.value)
      speakingTimeElement.textContent = countSpeakingTime(event.target.value)
      paragraphsElement.textContent = countParagraphs(event.target.value)
      keywordsListElement.innerHTML = ""

      setTallyWords(TallyWords(event.target.value))
    }

    function countLetters(str) {
      let letters = str.trim().split("")
      letters = letters.filter((letter) => {
        return letter !== "\n"
      })
      console.log(letters)
      return letters.length
    }


    function countWords(str) {
      let words = str.trim().split(/[/\n :;,]/)
      words = words.filter((word) => {
        return word.length > 1
      })
      return { WordsNum: words.length, Words: words }
    }

    function countSentences(str) {
      let sentences = str.trim().split(/[.?!]/)
      sentences = sentences.filter((sentence) => {
        return sentence !== ""
      })
      //console.log(sentences)
      return sentences.length
    }


    function countParagraphs(str) {
      //console.log(str)
      let paragraphs = str.trim().split("\n")
      paragraphs = paragraphs.filter((paragraph) => {
        return paragraph !== ""
      })
      //console.log(paragraphs)
      return paragraphs.length
    }

    function countReadingTime(str) {
      const avgWordsPerMinutes = 275
      let seconds = Math.floor((countWords(str).WordsNum / avgWordsPerMinutes) * 60) % 60
      let minutes = Math.floor((countWords(str).WordsNum / avgWordsPerMinutes))

      if (minutes > 0) {
        return `${minutes} min ${seconds} s`
      } else {
        return `${seconds} s`
      }
    }


    function countSpeakingTime(str) {
      const avgWordsPerMinutes = 180
      let seconds = Math.floor((countWords(str).WordsNum / avgWordsPerMinutes) * 60) % 60
      let minutes = Math.floor((countWords(str).WordsNum / avgWordsPerMinutes))

      if (minutes > 0) {
        return `${minutes} min ${seconds} s`
      } else {
        return `${seconds} s`
      }
    }


    function TallyWords(str) {
      let words = countWords(str).Words
      let wordsNum = countWords(str).WordsNum
      let tally = []

      words.forEach((word) => {
        let wordIndex = tally.findIndex((tally) => tally[0] === word)
        if (wordIndex === -1) {
          let tallyPercent = Math.round((1 / wordsNum) * 100)
          tally.push([word, 1, tallyPercent])
        } else {
          let tallyPercent = Math.round((tally[wordIndex][1] / wordsNum) * 100)
          tally[wordIndex][1] += 1
          tally[wordIndex] = [tally[wordIndex][0], tally[wordIndex][1], tallyPercent]
        }
      });
      tally.sort((a, b) => {
        return b[1] - a[1]
      })
      return tally
    }



    function setTallyWords(tallies) {
      tallies.forEach((tally) => {
        let li = document.createElement("li")
        let span1 = document.createElement("span")
        span1.textContent = tally[0]
        let span2 = document.createElement("span")
        span2.textContent = tally[1] + " , " + tally[2] + "%"
        li.appendChild(span1)
        li.appendChild(span2)
        keywordsListElement.appendChild(li)
      });
    }

    /*
        let hue = 0
        setInterval(() => {
          hue += 1
          document.querySelector("textarea").style.setProperty("--color", `hsl(${hue},50%,50%)`)
          document.querySelector("#stats").style.setProperty("--color", `hsl(${hue},50%,50%)`)
        }, 100)
    */
  })

  return (
    <div id="container" className="">
      <textarea id="" className="" cols="30" rows="10" placeholder="Start Writing..."></textarea>
      <div id="stats">
        <h2>Statics</h2>
        <hr />
        <div>
          <h4>Number of Letters: </h4><p id="letters-stat">0</p>
          <h4>Number of Words: </h4><p id="words-stat">0</p>
          <h4>Number of Sentences: </h4><p id="sentences-stat">0</p>
          <h4>Number of Paragraphs: </h4><p id="paragraphs-stat">0</p>
        </div>
        <hr />
        <div>
          <h4>Reading time: </h4><p id="reading-time-stat">0 mins</p>
          <h4>Speaking time: </h4><p id="speaking-time-stat">0 mins</p>
        </div>
        <hr />
        <h3>Keywords</h3>
        <ul id="keyword-list" className=""></ul>
      </div>
    </div>
  );
}
