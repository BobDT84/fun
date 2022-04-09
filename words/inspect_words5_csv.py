import csv
import json
from operator import concat
import os
import re

file = '/words/words5.csv'
path = os.getcwd()
filepath = concat(path,file)

words5 = []

with open(filepath, 'r') as wordsFile:
    csvreader = csv.reader(wordsFile)
    for words in wordsFile:
        words5 = words.split(',')

print(words5[4355])
print('endue' in words)