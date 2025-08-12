export default function Line({ line }: { line: string }) {
  const words = line.split(" ")

  return words.map((word, index) => (
    <span key={index}>
      <Word word={word} />{" "}
    </span>
  ))
}

const Word = ({ word }: { word: string }) => {
  return <span>{word}</span>
}
