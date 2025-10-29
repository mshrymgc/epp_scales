# Japanese Nonverbal Vocalization corpus, JNV

## Update
2023.4.11, 1st version
2023.10.17, add results of emotion recognizability and authenticity described in our paper
2024.10.26, fix a naming problem

## Description
This corpus consists of Japanese emotional nonverbal vocalizations (NVs) such as laughter, sobbing, and scream that can express emotions.

Specification:
- Speaker: 4 speakers (F1, F2, M1, M2), F represents female, M represents male. M2 is a professional speaker, others are amateur.
- Emotions: angry (anger), disgust, fear, happy, sad, surprise
- Duration: 406.9 seconds
- Sampling rate: 48 kHz
- Audio format: wav
- Sessions: each audio file is in one of the two sessions
    - Regular session (R): the phrase of the NV was designated
    - phrase-free session (F): the phrase of the NV was decided by the speaker
- #Audio files: 420, each speaker has 105 NVs, in which 87 are in regular session, 15 are in phrase-free session

## Directory
```
- readme.txt    # This file
- phrases.txt   # All phrases in regular session
- file_authenticity.csv # the authenticity scores for each utterance obtained by crowdsourcing, as described in our paper
- file_forced_choice_accuracy.csv # the forced choice emotion recognition accuracy for each utterance, as described in our paper
- file_rating_scale.csv # the emotion scores for each utterance obtained in the rating evaluation, as described in our paper
- speaker (F1, F2, M1, M2)
    - {speaker}_{emotion}_{id}_{session}.wav
```
For example `F1_angry_00_R.wav` represents the first NV expressing anger of speaker F1 in the regular session.
By checking the phrases in `phrases.txt` we can know the phrase of this NV is "ああ".

## Paper
[Xin, Detai, Shinnosuke Takamichi, and Hiroshi Saruwatari. "JNV corpus: A corpus of Japanese nonverbal vocalizations with diverse phrases and emotions." *Speech Communication* 156 (2024): 103004.](https://www.sciencedirect.com/science/article/pii/S0167639323001383)

## Contributor
Detai Xin (UTokyo)

## License
This work is licensed under a [CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).
See official instructions [here](https://creativecommons.org/about/cclicenses/).
