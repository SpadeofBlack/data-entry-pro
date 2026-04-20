"use client";
import { useState, useEffect } from "react";
import Link from 'next/link'; 

const DATA_MODES = {
  "Standard Text": ["Alice Vance", "Charlie Delta", "Cleshawn Montegue", "Zeke Miller", "Aubrey Hawk", "Olivia Millar", "Liam Jackson", "Jasper Whitlock", "Theodora Washington", "Sienna Von Trapp", "Blanche Reynolds", "Darcy Smith", "Lucy Wong", "Oliver Bullock", "Henry Frankfert", "Alder Liebowitz", "Fable Samualson", "Alyssa Vasquez", "Wilbur Kentucky", "Makorov Dreyer", "Nacho Bartoromo", "Kevin Ramage", "Raider Dave","Jeannie Gold", "Ricky Spanish", "Clip Clop", "Sholanda Dykes", "Gilda Bux", "Kevin Bacon", "Rocherro Ferrero", "Clint McGlint", "Gust Breezer", "Giardia Capitosto", "Rolex Gordini", "Erastus J. Horton", "Wally Wrobel", "Rudolfo Mayerling", "Dante Octovarius", "A. Poth E. Cary", "Jameson McSmirnoff", "Shebecca Escrow", "Harriet Bustax", "Sunny Sunderson", "Josay Bosay", "Dimitrus Fitzpatio", "Hugh J. Jeanman", "Gord Gomax", "Bonnie Ramirez", "Jenna D. Evans", "Jordan Edelstien", "Braff Zacklin", "Dom Fikowski", "Maurice Barns", "Roy R. McFreely", "Sidney Huffman", "Rafael Penguin", "Caitlyn M. Smith", "Juanito Pequeno", "Emmilou Sugarbean", "Ernest Shlumpel", "Abigail Lemonparty", "Max Jets", "Frankie Carconi", "Alicia Wilkner", "Frank Slade", "Gerald Ya Ya", "Luis Valdez", "Ira Siegal", "Fantasia Lopez", "Abbey Road", "Ace Chapman", "Bing Cooper", "Jenny Fromdabloc", "Hubert LeGrange", "Chex LeMeneux", "Vince Manaco", "Clive Trotter", "Miles Raymond", "Hershel Hershbaum"],
  "Alpha-Numeric": ["ID-8849-XJ", "DELL-5520-CP", "UNIT-99-B2", "CONF-AX-774", "ZONE-882-TX", "XU6O4DMFW", "CQ956MOB2", "ZW32X6NE7", "RHOVGU4AE", "A0CUQPGX4", "AP-7721-L0", "MAC-0012-XT", "LOG-992-K9", "SKU-441-VB", "USER-902-ID", "NX-882-001", "VT-554-PL3", "BATT-992-X", "GRID-001-A", "LINK-44-Q2", "772-XJ-009", "110-VB-221", "882-PL-551", "334-QT-990", "551-ZX-112"],
  "Numeric (10-Key)": ["99283.44", "1002.99", "88271102", "554.20", "00293.11", "1250.79", "4001.00", "782.11", "9485.22", "1102.93", "88273.11", "90210.44", "5512.90", "112.334", "887.221", "0.00293", "100.22", "445.99", "1029.33", "7721.90", "99827", "11029", "88273", "55120", "00291"],
  "Structured Forms": ["Name: Idali | Age: 20", "Qty: 45 | Item: CPU", "Date: 04-11-26", "Lat: 31.76 | Lon: -106.48", "User: Cooper | ID: 99", "Ref: 882 | Code: XT", "Type: SSD | Cap: 1TB", "Loc: TX | Zone: 915", "Temp: 98.6 | Status: OK", "Price: 19.99 | Tax: 1.25", "Job: Dev | Lang: C#", "Env: Unity | Ver: 6.0", "Speed: 45 | Acc: 100", "Mode: 10-Key | Lvl: 10", "Dog: Husky | Age: 7m", "VSC: Active | Git: Yes"]
};

type Mode = keyof typeof DATA_MODES;

export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [level, setLevel] = useState(1);
  const [levelList, setLevelList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameState, setGameState] = useState("waiting"); 
  const [errors, setErrors] = useState(0);
  const [totalChars, setTotalChars] = useState(0);

  const ERROR_LIMIT = 15;
  const START_TIME = 45;

  const generateLevelList = (m: Mode) => {
    const pool = DATA_MODES[m];
    return [...Array(5)].map(() => pool[Math.floor(Math.random() * pool.length)]);
  };

  useEffect(() => {
    if (mode) setLevelList(generateLevelList(mode));
  }, [mode, level]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && gameState === "waiting" && mode) {
        e.preventDefault();
        setGameState("playing");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, mode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft <= 0 && gameState === "playing") {
      setGameState("gameover");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (errors >= ERROR_LIMIT && gameState === "playing") {
      setGameState("gameover");
    }
  }, [errors, gameState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "playing") return;
    const value = e.target.value;
    const target = levelList[currentIndex];
    if (value.length > target.length) return;

    const lastIdx = value.length - 1;
    if (value[lastIdx] !== target[lastIdx]) {
      setErrors(prev => prev + 1);
    } else {
      setTotalChars(prev => prev + 1);
    }
    setUserInput(value);

    if (value.length === target.length) {
      setTimeout(() => {
        if (currentIndex < levelList.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setUserInput("");
        } else {
          if (level < 10) {
            setLevel(prev => prev + 1);
            setCurrentIndex(0);
            setUserInput("");
            setTimeLeft(prev => prev + 15);
          } else {
            setGameState("victory");
          }
        }
      }, 150);
    }
  };

  const restart = () => {
    setMode(null); setLevel(1); setCurrentIndex(0); setUserInput("");
    setTimeLeft(START_TIME); setErrors(0); setTotalChars(0); setGameState("waiting");
  };

  const timeActive = (START_TIME + ((level - 1) * 15)) - timeLeft;
  const kpm = timeActive > 0 ? Math.round((totalChars / timeActive) * 60) : 0;
  const wpm = Math.round(kpm / 5);
  const grade = (wpm > 40 && errors < 6) ? { label: "A", color: "text-emerald-400" } : { label: "C", color: "text-orange-400" };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4">
      {/* NAVIGATION BAR - NOW INSIDE THE RETURN */}
      <nav className="mb-8 flex items-center gap-8 bg-zinc-900 px-8 py-3 rounded-full border border-white/5">
        <Link href="/" className="text-sm font-black text-yellow-500 hover:text-white transition-colors">TRAINER</Link>
        <Link href="/profile" className="text-sm font-black text-zinc-500 hover:text-white transition-colors">PROFILE</Link>
        <Link href="/dashboard" className="text-sm font-black text-zinc-500 hover:text-white transition-colors">DASHBOARD</Link>
      </nav>

      <div className="w-full max-w-3xl bg-zinc-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        {/* The rest of your game code follows... */}
        {(gameState === "gameover" || gameState === "victory") && (
          <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center rounded-[2.5rem] p-10">
            <h2 className={`text-6xl font-black mb-4 ${gameState === 'victory' ? 'text-emerald-500' : 'text-red-600'}`}>
              {gameState === 'victory' ? 'CERTIFIED' : 'FAILED'}
            </h2>
            <div className="text-8xl font-black mb-8 font-mono bg-white/5 w-32 h-32 flex items-center justify-center rounded-full border border-white/10">
              <span className={grade.color}>{grade.label}</span>
            </div>
            <button onClick={restart} className="bg-white text-black px-12 py-4 rounded-full font-black tracking-widest hover:bg-yellow-500 transition-all">MAIN MENU</button>
          </div>
        )}

        {gameState === "waiting" && mode && (
          <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center rounded-[2.5rem] backdrop-blur-sm">
            <p className="text-white text-2xl font-mono animate-pulse uppercase tracking-widest">Press SPACE to Start</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-10">
          <div className="text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase">{mode || "Select Mode"}</div>
          <div className="flex gap-4 items-center">
            <div className="text-emerald-500 font-mono text-sm">{wpm} WPM</div>
            <div className={`font-mono text-sm px-4 py-1 rounded-full border ${errors >= 12 ? 'border-red-500 text-red-500 animate-pulse' : 'border-zinc-700 text-zinc-500'}`}>
              STRIKES: {errors}/{ERROR_LIMIT}
            </div>
          </div>
        </div>

        {!mode ? (
           <div className="grid grid-cols-2 gap-4 mt-4">
           {Object.keys(DATA_MODES).map((m) => (
             <button key={m} onClick={() => setMode(m as Mode)} className="bg-zinc-800/50 border border-white/5 p-6 rounded-2xl hover:border-yellow-500 transition-all text-left">
               <h3 className="font-bold text-lg">{m}</h3>
               <p className="text-[10px] text-zinc-500 mt-1">Accuracy Mode</p>
             </button>
           ))}
         </div>
        ) : (
          <>
            <div className="flex gap-2 mb-8">
              {levelList.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < currentIndex ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : i === currentIndex ? 'bg-yellow-500' : 'bg-zinc-800'}`} />
              ))}
            </div>

            <div className="text-center mb-12">
              <p className="text-xs text-zinc-600 uppercase mb-4 tracking-widest font-bold">Level {level} of 10</p>
              <div className="text-4xl font-mono tracking-tighter leading-relaxed">
                {levelList[currentIndex]?.split("").map((char, i) => {
                  let color = "text-zinc-700";
                  if (i < userInput.length) color = userInput[i] === char ? "text-emerald-400" : "text-red-500 underline";
                  return <span key={i} className={color}>{char}</span>;
                })}
              </div>
            </div>

            <input
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Backspace') e.preventDefault(); }}
              className="w-full bg-black/20 border-2 border-white/5 rounded-2xl p-6 text-2xl font-mono text-center focus:outline-none focus:border-yellow-500 transition-all"
              value={userInput}
              onChange={handleInputChange}
              placeholder="..."
            />
            <div className="mt-8 text-center font-mono text-zinc-500 text-sm">
              {timeLeft}s remaining
            </div>
          </>
        )}
      </div>
    </main>
  );
}