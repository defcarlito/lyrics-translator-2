import { Setter } from "@/types/setter";
import WordCard from "./components/WordCard/WordCard";

export default function VocabWordsBox({
  clickedWords,
  setClickedWords,
}: {
  clickedWords: Set<string>;
  setClickedWords: Setter<Set<string>>;
}) {
  return (
    <>
      {clickedWords.size === 0 ? (
        <div className="bg-card border p-4 rounded-md w-sm md:w-md content-start">
          <div className="bg-card border p-4 rounded-sm flex gap-4 flex-col">
            <h1 className="font-medium text-lg">Quick Guide</h1>
            <ul className="list-disc list-inside">
              <li>
                As you click unfamiliar words from the lyrics, the collection of
                words will appear here along with the words&#39; metadata.
              </li>
              <li>
                Once you are satisfied with your collection, you may export it
                to Quizlet with the button below.
              </li>

              <li>Some words may take longer than others to translate.</li>
              <li>
                Searching for a new song will delete your current collection.
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-card border p-4 rounded-md w-sm md:w-md grid grid-cols-2 lg:grid-cols-3 gap-4 content-start overflow-scroll h-[50vh] lg:h-[75vh]">
          {[...clickedWords].map((word, index) => (
            <WordCard
              word={word}
              setClickedWords={setClickedWords}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
