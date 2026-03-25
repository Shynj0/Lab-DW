import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box, FormControl, InputLabel, Card, CardContent } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Extração de valores únicos para os filtros
const courses = Array.from(new Set(books.map(book => book.course)));
const semesters = Array.from(new Set(books.map(book => book.semester)));

  const filteredBooks = books.filter(book => {
    const matchCourse = selectedCourse === "" || book.course === selectedCourse;
    const matchSemester = selectedSemester === "" || book.semester === Number(selectedSemester);
    return matchCourse && matchSemester;
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Filtrar Referências</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Disciplina</InputLabel>
          <Select 
            value={selectedCourse} 
            label="Disciplina"
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Todas as Disciplinas</MenuItem>
            {courses.map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Semestre</InputLabel>
          <Select 
            value={selectedSemester} 
            label="Semestre"
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {semesters.map(sem => (
              <MenuItem key={sem} value={sem}>{sem}º Semestre</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book, idx) => (
          <Card key={idx} sx={{ mb: 2, borderLeft: '5px solid #1976d2' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">{book.title}</Typography>
              <Typography variant="body2">{book.author} - {book.course}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="textSecondary">Nenhum livro encontrado para este filtro.</Typography>
      )}
    </Box>
  );
}