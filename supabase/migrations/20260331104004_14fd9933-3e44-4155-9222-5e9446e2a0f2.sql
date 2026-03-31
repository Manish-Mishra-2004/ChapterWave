
-- Add published column to books
ALTER TABLE public.books ADD COLUMN published boolean NOT NULL DEFAULT false;

-- Allow anyone (including anon) to read published books
CREATE POLICY "Anyone can view published books"
  ON public.books FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow anyone to read chapters of published books
CREATE POLICY "Anyone can view chapters of published books"
  ON public.chapters FOR SELECT
  TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM books
    WHERE books.id = chapters.book_id AND books.published = true
  ));
