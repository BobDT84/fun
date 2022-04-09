import csv
import json
from operator import concat
import os
import re

words = []
difficultWords = []
words4 = []
words5 = []
words6 = []
words7 = []
words8 = []

def openFile(filepath):
    array = []
    with open(filepath, 'r') as wordsFile:
        csvreader = csv.reader(wordsFile)
        for x in wordsFile:
            array.append(x.replace('\n',''))
    return array

wordsFile = 'words.txt'
difficultFile = 'difficultWords.txt'
path = os.getcwd() + '/words/'
wordsFilepath = concat(path,wordsFile)
difficultFilepath = concat(path,difficultFile)
words = openFile(wordsFilepath)
difficultWords = openFile (difficultFilepath)
print(path)
print(difficultWords)


for i,word in enumerate(words):
    if word.endswith("'s"):
        word = word.replace("'s",'')
    words[i] = word

words = list(set(words))
pattern = r'[a-zA-Z]'

for word in difficultWords:
    if word in words:
        words.remove(word)

for word in words:
    if word[0].isupper():
        continue
    if len(re.findall(pattern, word)) != len(word):
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
    path = os.getcwd() + '/words/'
    filepath = concat(path, file)
    with open(filepath, 'w') as f:
        write = csv.writer(f)
        write.writerow(wordsDict[wordGroup])


print(len(words4))
print(len(words5))
print(len(words6))
print(len(words7))
print(len(words8))
