import csv
import json
from operator import concat
import os
import re

file = '/words/words.txt'
path = os.getcwd()
filepath = concat(path,file)

words = []
words4 = []
words5 = []
words6 = []
words7 = []
words8 = []

with open(filepath, 'r') as wordsFile:
    csvreader = csv.reader(wordsFile)
    for x in wordsFile:
        words.append(x)

for i,word in enumerate(words):
    word = word.replace('\n','')
    if word.endswith("'s"):
        word = word.replace("'s",'')
    words[i] = word

words = list(set(words))
pattern = r'[a-zA-Z]'


for word in words:
    if word[0].isupper():
        continue
    if len(re.findall(pattern, word)) != len(word):
        print(word)
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
print(len(words4))
print(len(words5))
print(len(words6))
print(len(words7))
print(len(words8))
