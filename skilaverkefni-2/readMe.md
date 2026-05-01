# Team Task Hub – Prófunarverkefni (skilaverkefni-2)

## Yfirlit

Í **skilaverkefni-2** er markmiðið að **prófa** appið frá **skilaverkefni-1** (Team Task Hub). Þú byggir ofan á lausnina frá skilaverkefni-1: sömu kóðagrunn, sömu virkni og kröfur, en bætir við gagnlegum prófunarverkfærum.

---

## Kröfur (prófunarhluti)

Byggðu ofan á kóðann úr skilaverkefni-1 og bættu við eftirfarandi.

### 1. Vitest (eininga- / component-próf)

- Settu upp **Vitest**.
- Skrifaðu próf sem sýna fram á lykilvirkni (t.d. hægðir, umbreytt components, reikningar, helpers).
- Prófin eiga að keyra með npm

### 2. Storybook

- Settu upp **Storybook** fyrir forritið.
- Búðu til fyrir component einingar (t.d. task/project UI, tómm rými, rök við hlið) svo hægt sé að skoða component í einangrun.

### 3. Cypress (E2E)

- Settu upp **Cypress** með E2E prófum.
- Próf eiga að fara yfir **að minnsta kosti eitt raunverulegt notanda flæði** (t.d. búa til project, bæta við task, merkja lokið – eftir því hvað forritið býður upp á) í **raunlíkum vafra**.

### 4. CI-pípa (próf keyrð sjálfkrafa)

- Settu upp **CI-pípu** sem keyrir **prófin** eftir því sem hægt er, venjulega við `push` og/eða `pull request` á main.
- **Vitest** keyrð í pípunni.
- **Cypress (E2E)** keyrð í pípunni.

## 5. Það eru tveir böggar í kóðanum sem þú átt að finna og leysa. Notaðu prófanir til að átta þig á því hvað þeirr eru!

---

## Tækni og innsending

- Eins og í skilaverkefni-1: **TypeScript** og skýrt skipulag.
- Skilgreindu í `package.json` (eða sambærilegu) hvernig á að keyra Vitest, Storybook og Cypress svo kennari geti fylgt lýsingu.
- Skráðu **CI** í repo (t.d. `.github/workflows/...` á GitHub eða sambærið á öðru kerfi) svo hægt sé að sjá niðurstöðu prófanna í yfirliti.

### Reglur og skil (skilaverkefni-2)

- Minnsta kosti **5 Git commits** sérstaklega tengd prófunum (setup + próf) – eða sambærilegt skýrt stigvaxandi commit history.
- Linkur á **repo** og (ef við á) stutt lýsing á hvernig prófin og **CI** eru keyrð.

---

# Námsmat (100 stig) – prósenta skipt

## 1. Vitest – 32 stig

- Set upp hefur verið gert og próf keyra: **8**
- Gild próf á lógík / einingar: **15**
- Læsilegur prófunarkóði og hæfileg nýting á library (Testing Library o.fl.): **9**

## 2. Storybook – 28 stig

- Storybook ræsir og sögur sýnilegar: **10**
- Fjölbreytt sögur (stöður, props, edge cases): **13**
- Faglegt skipulag sögumappa og samræmt við forritið: **5**

## 3. Cypress E2E – 20 stig

- E2E keyrir markvisst: **6**
- A.m.k. eitt inntaksfært E2E-ás sem sýnir alvöru hegðun: **10**
- Stöðug próf, skýrir selectors, ekki of brothætt: **4**

## 4. Lýsing, skjöl og tenging við skilaverkefni-1 – 10 stig

- Góð skipulag á test innan
- README eða skjöl sem lýsa prófun: **3**
- Aðgengilegar npm-skipanir: **3**

## 5. CI-pípa – 10 stig

- CI-skrá er til staðar og færslur sýnilegar: **3**
- **Vitest** keyrð sjálfkrafa: **4**
- **Cypress** keyrð sjálfkrafa: **3**

---
