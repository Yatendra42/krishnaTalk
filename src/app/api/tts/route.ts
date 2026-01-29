import { NextRequest, NextResponse } from 'next/server';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY || process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    const client = new ElevenLabsClient({ apiKey });

    const audioStream = await client.textToSpeech.convert(
      'JBFqnCBsd6RMkjVDRZzb', // Voice ID: George (Multilingual)
      {
        text,
        modelId: 'eleven_multilingual_v2',
        outputFormat: 'mp3_44100_128',
      }
    );

    // Convert the stream into a Uint8Array buffer
    const chunks: Uint8Array[] = [];
    
    // Attempt async iteration
    try {
      if ((audioStream as any)[Symbol.asyncIterator]) {
        for await (const chunk of (audioStream as any)) {
          chunks.push(new Uint8Array(chunk));
        }
      } else {
        const reader = (audioStream as unknown as ReadableStream).getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) chunks.push(new Uint8Array(value));
        }
      }
    } catch (streamError) {
      console.error('Stream processing error:', streamError);
      throw streamError;
    }

    // Combine chunks into a single Uint8Array
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    return new NextResponse(combinedBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Error in TTS route:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
