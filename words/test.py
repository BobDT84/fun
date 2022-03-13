import csv
import json

file = 'words.txt'

words = []
words4 = []
words5 = []
words6 = []
words7 = []
words8 = []

with open(file, 'r') as wordsFile:
    csvreader = csv.reader(wordsFile)

    for x in wordsFile:
        words.append(x)

for i,word in enumerate(words):
    word = word.replace('\n','')
    if word.endswith("'s"):
        word = word.replace("'s",'')
    words[i] = word

words = list(set(words))

for word in words:
    if word[0].isupper():
        continue
    if len(word) == 4:
        words4.append(word)
    elif len(word) == 5:
        words5.append(word)
    elif len(word) == 6:
        words6.append(word)
    elif len(word) == 7:
        words7.append(word)
    elif len(word) == 8:
        words8.append(word)

wordsDict = {
    'words4':words4,
    'words5':words5,
    'words6':words6,
    'words7':words7,
    'words8':words8,
}
for i in range(4,9):
    wordGroup = 'words' + str(i)
    file = wordGroup + '.csv'
    with open(file, 'w') as f:
        write = csv.writer(f)
        write.writerow(wordsDict[wordGroup])

with open('allWords.json', 'w') as f:
    json.dump(wordsDict,f)

    
print(json.dumps(words4[:10]))