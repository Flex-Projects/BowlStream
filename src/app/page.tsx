import React from 'react';

type FrameProps = {
  score1?: string;
  score2?: string;
  score3?: string;
};

type Frame = {
  bowls: string[]
  postion: number
  total: number
}

type Game = {
  frames: Frame[]
  totalScore: number
}

export function Frame({ score1 = "", score2 = "" }: FrameProps) {
  return (
    <div className="border-white border-2 border-l-0 w-20 h-20 text-3xl flex-col">
      <div className="flex justify-end">
          <div className="flex justify-center w-10 h-10">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
          <div className= "border-white border-l-2 border-b-2 w-10 h-10 flex justify-center">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
      </div>
      <div className="flex justify-center">
        100
      </div>
    </div>
  )
}

export function StartFrame({ score1 = "", score2 = "" }: FrameProps) {
  return (
    <div className="border-white border-2 w-20 h-20 text-3xl flex-col">
      <div className="flex justify-end">
          <div className="flex justify-center w-10 h-10">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
          <div className= "border-white border-l-2 border-b-2 w-10 h-10 flex justify-center">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
      </div>
      <div className="flex justify-center">
        100
      </div>
    </div>
  )
}

export function EndFrame({ score1 = "", score2 = "" , score3 = ""}: FrameProps) {
  return (
    <div className="border-white border-2 border-l-0 w-30 h-20 text-3xl flex-col">
      <div className="justify-end flex">
          <div className= "border-white border-b-2 w-10 h-10 flex justify-center">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
          <div className= "border-white border-l-2 border-b-2 w-10 h-10 flex justify-center">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
          <div className= "border-white border-l-2 border-b-2 w-10 h-10 flex justify-center">
            <input maxLength={1} className="flex items-center justify-center w-5 h-10"/>
          </div>
      </div>
      <div className="flex justify-center">
        100
      </div>
    </div>
  )
}

function calculateScore(game: Game) {
  game.frames.forEach(frame => {
    frame.bowls.forEach((bowl, index) => {
      if (bowl === "X") {
        // Strike logic
        frame.total += 10;
        // Last Frame
        if (index + 1 == game.frames.length) {
          frame.total += game.frames[index + 1].bowls[0] === "X" ? 10 : parseInt(game.frames[index + 1].bowls[0] || "0", 10);
          if (game.frames[index + 1].bowls[0] === "X" && index + 2 < game.frames.length) {
            frame.total += game.frames[index + 2].bowls[0] === "X" ? 10 : parseInt(game.frames[index + 2].bowls[0] || "0", 10);
          } else {
            frame.total += parseInt(game.frames[index + 1].bowls[1] || "0", 10);
          }
        }
        // Second Last Frame
        else if (index + 2 == game.frames.length) {
          frame.total += game.frames[index + 1].bowls[0] === "X" ? 10 : parseInt(game.frames[index + 1].bowls[0] || "0", 10);
          if (game.frames[index + 1].bowls[0] === "X" && index + 2 < game.frames.length) {
            frame.total += game.frames[index + 2].bowls[0] === "X" ? 10 : parseInt(game.frames[index + 2].bowls[0] || "0", 10);
          }
        } 
        // Strike on the next frame
        else if (game.frames[index + 1] && game.frames[index + 1].bowls[1] === "X") {
          frame.total += 10;
        } 
        // Normal case
        else {
          frame.total += parseInt(game.frames[index + 1]?.bowls[0] || "0", 10);
          frame.total += parseInt(game.frames[index + 1]?.bowls[1] || "0", 10);
        }
      } else if (bowl === "/") {
        // Spare logic
        frame.total += 10

        if (index + 1 == game.frames.length) {
          frame.total += game.frames[index + 1]
        }
      } else {
        frame.total += parseInt(bowl || "0", 10);
      }
    });
  });
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-row gap-[0px] row-start-2 items-center sm:items-start">
        <StartFrame></StartFrame>
        <Frame score1="1" score2="2"/>
        <Frame score2= "X"></Frame>
        <Frame></Frame>
        <Frame></Frame>
        <Frame></Frame>
        <Frame></Frame>
        <Frame></Frame>
        <Frame></Frame>
        <EndFrame score1="1" score2="/" score3="9"/>
      </main>
    </div>
  );
}
