import asyncio
import edge_tts

async def list_ptbr_voices():
    voices = await edge_tts.list_voices()
    pt = [v for v in voices if 'pt-BR' in v['Locale']]
    for v in pt:
        print(f"Name: {v['ShortName']}, Gender: {v['Gender']}")

if __name__ == '__main__':
    asyncio.run(list_ptbr_voices())
