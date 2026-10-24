import asyncio
import edge_tts
from mutagen.mp3 import MP3

SCENES = [
    {
        "id": "cena_01",
        "name": "Cena 1 - Fachada",
        "target_dur": 4.5,
        "text": "Se tem festa, tem Kiki Salgados! Conheça o novo cardápio digital da sua loja."
    },
    {
        "id": "cena_02",
        "name": "Cena 2 - Logo",
        "target_dur": 3.8,
        "text": "Agora seus clientes pedem pelo celular, com cardápio, kits e carrinho num só lugar."
    },
    {
        "id": "cena_03",
        "name": "Cena 3 - Cardápio",
        "target_dur": 5.0,
        "text": "Eles escolhem os salgados por categoria e adicionam ao pedido com um toque."
    },
    {
        "id": "cena_04",
        "name": "Cena 4 - Monte seu Kit",
        "target_dur": 5.0,
        "text": "Também montam o próprio kit, escolhendo a quantidade de cada sabor e vendo o total na hora."
    },
    {
        "id": "cena_05",
        "name": "Cena 5 - WhatsApp",
        "target_dur": 5.5,
        "text": "No fim, o pedido chega pronto no WhatsApp da loja, que só precisa confirmar."
    },
    {
        "id": "cena_06",
        "name": "Cena 6 - Fechamento",
        "target_dur": 5.0,
        "text": "O cardápio digital da Kiki Salgados está pronto. Vamos colocar no ar?"
    }
]

VOICES = {
    "antonio": "pt-BR-AntonioNeural",
    "francisca": "pt-BR-FranciscaNeural",
    "thalita": "pt-BR-ThalitaMultilingualNeural"
}

async def generate_scene(voice_key, voice_name, scene):
    filename = f"narracao_{scene['id']}_{voice_key}.mp3"
    communicate = edge_tts.Communicate(scene['text'], voice_name, rate="+4%")
    await communicate.save(filename)
    audio = MP3(filename)
    print(f"[{voice_key}] {scene['id']} ({audio.info.length:.2f}s / meta {scene['target_dur']}s): {filename}")
    return filename, audio.info.length

async def generate_full(voice_key, voice_name):
    # Texto contínuo com pausas naturais
    full_text = (
        "Se tem festa, tem Kiki Salgados! Conheça o novo cardápio digital da sua loja. "
        "Agora seus clientes pedem pelo celular, com cardápio, kits e carrinho num só lugar. "
        "Eles escolhem os salgados por categoria e adicionam ao pedido com um toque. "
        "Também montam o próprio kit, escolhendo a quantidade de cada sabor e vendo o total na hora. "
        "No fim, o pedido chega pronto no WhatsApp da loja, que só precisa confirmar. "
        "O cardápio digital da Kiki Salgados está pronto. Vamos colocar no ar?"
    )
    filename = f"narracao_completa_28s_{voice_key}.mp3"
    communicate = edge_tts.Communicate(full_text, voice_name, rate="+3%")
    await communicate.save(filename)
    audio = MP3(filename)
    print(f"[{voice_key}] NARRACAO COMPLETA ({audio.info.length:.2f}s): {filename}")

async def main():
    for v_key, v_name in VOICES.items():
        print(f"\n--- Gerando para voz: {v_key} ({v_name}) ---")
        for sc in SCENES:
            await generate_scene(v_key, v_name, sc)
        await generate_full(v_key, v_name)

if __name__ == '__main__':
    asyncio.run(main())
