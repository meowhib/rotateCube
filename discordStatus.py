import requests

TOKEN = "MzkwMDc5MDQ1MDY2NTU1Mzk0.YRIhKw.opCKaTBC815UReFTGnGf_L5UnY0"

payload = {
  "status": "online"
}

header = {
  "authorization": TOKEN
}

request = requests.post("https://discord.com/channels/871389993627709460/871389993627709463", data=payload, headers=header)
print(request.status_code)