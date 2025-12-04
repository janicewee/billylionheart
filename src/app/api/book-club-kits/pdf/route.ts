import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('bookId');
    
    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Map book IDs to their PDF filenames
    const pdfFiles: Record<string, string> = {
      '4': 'Billy_The_Lion_Boy_Book_Club_Kit_UPDATED.pdf',
      '5': 'Billy_And_Bluma_Double_Trouble_Book_Club_Kit.pdf',
      '6': 'Secret_Hero_Flying_Lion_Book_Club_Kit.pdf'
    };

    const filename = pdfFiles[bookId];
    
    if (!filename) {
      return NextResponse.json({ error: 'Book club kit not found' }, { status: 404 });
    }

    // Read the PDF file from the public directory
    const filePath = join(process.cwd(), 'public', 'book-club-kits', filename);
    const fileBuffer = await readFile(filePath);

    // Encode filename for Content-Disposition header (RFC 6266)
    const encodedFilename = encodeURIComponent(filename);
    const contentDisposition = `inline; filename="${filename.replace(/"/g, '\\"')}"; filename*=UTF-8''${encodedFilename}`;

    // Return the PDF with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({ error: 'Failed to load PDF' }, { status: 500 });
  }
}