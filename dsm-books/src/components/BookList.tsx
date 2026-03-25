import { useBooks } from "../context/BooksContext";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function BookList() {
  const { books } = useBooks();

  return (
    <Box>
      {books.map((book, idx) => (
        <Card key={idx} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {book.author} | {book.publisher} ({book.year})
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Disciplina: {book.course} | Semestre: {book.semester}º
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}