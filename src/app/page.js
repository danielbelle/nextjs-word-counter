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
        }, 1500)
    */
  })

  return (
    <div id="container" className="w-[100vw] grid-rows-2 h-[100vh] grid items-center justify-center lg:grid-cols-10 lg:grid-rows-1 overflow-y-scroll">
      <textarea id="" className="col-span-7 w-[90%] h-[85%] bg-[#eee] resize-none overflow-y-scroll rounded-[10px] border-solid border-[3px] border-black outline-none p-[10px] text-black text-[10px] lg:col-span-7 row-span-1 m-auto" cols="30" rows="10" placeholder="Start Writing..." />

      <div id="stats" className="lg:col-span-3 row-span-2 border-solid bg-[#eee] border-[3px] rounded-[10px] text-black lg:h-auto tracking-[1.1px] divide-y-2 justify-center items-center m-auto w-[500px] lg:w-[85%] px-[5px] lg:pl-1 lg:px-0 mt-[47px]">
        <h2 className="flex justify-center lg:text-xl font-bold">Statics</h2>
        <div className="flex flex-col">
          <h4 className="m-[0px] p-[10px] w-fit text-sm lg:text-lg">N° of Letters: <p className="inline text-sm lg:text-lg" id="letters-stat">0</p></h4>
          <h4 className="m-[0px] p-[10px] w-fit text-sm lg:text-lg">N° of Words: <p className="inline text-sm lg:text-lg" id="words-stat">0</p></h4>
          <h4 className="m-[0px] p-[10px] w-fit text-sm lg:text-lg">N° of Sentences: <p className="inline text-sm lg:text-lg" id="sentences-stat">0</p></h4>
          <h4 className="m-[0px] p-[10px] w-fit text-sm lg:text-lg">N° of Paragraphs: <p className="inline text-sm lg:text-lg" id="paragraphs-stat">0</p></h4>
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm m-[0px] p-[10px] w-fit lg:text-lg">Reading time: <p className="inline text-sm lg:text-lg" id="reading-time-stat">0 mins</p></h4>
          <h4 className="m-[0px] p-[10px] w-fit lg:text-lg text-sm">Speaking time: <p className="inline text-sm lg:text-lg" id="speaking-time-stat">0 mins</p></h4>
          <h3 className="flex justify-center my-2 lg:text-xl pt-3 font-bold">Keywords</h3>
        </div>

        <ul id="keyword-list" className="flex flex-col p-[0px]  overflow-y-scroll pt-2"></ul>
      </div>
    </div>
  );
}
