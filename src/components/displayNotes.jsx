import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import Note from "./note";

function DisplayNotes({ notes }) {
  return (
    <div>
      <div className="max-w-5xl mx-auto justify-center grid grid-cols-3 gap-4 mt-6 mb-4">
        {notes.map((note) => (
          <Note key={note.id} data={note} />
        ))}
      </div>
    </div>
  );
}

export default DisplayNotes;
