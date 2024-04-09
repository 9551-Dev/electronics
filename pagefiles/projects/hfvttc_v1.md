[font-size = 1.3em]{
Despite collecting tons of tubes,
i havent done much with them other than small experiments
}

So i have finally decided to build some sort of a tesla coil, starting with an HFVTTC

whether or not this was a good starting point, i have no idea but the schematic is rather straight forward

My design was based on this one by uzzors2k

![Epic toob schematic](__IMAGE__/schematic/uzzors2k_hfvttc.png)
![showcase of my build](__IMAGE__/general_4.jpg)

---

The difference was mainly that i used a different tube, and handle the g2 power differently

I am for now using **GU50 soviet pentode**, while he used a way more powerful GK-71

As for the G2 supply, i am currently using rectified mains (filtered) which is put
across g2 and the cathode instead of a large resistor which just connects G2 anode potential

![g2 power supply](__IMAGE__/supply_1.jpg)

The issue here is that i only run this circuit at about 80V (because the HV part is MOT powered and i dont want to overvoltage the GU50 much)

[color: red][This leads to a low G2 voltage of only about 110V, i plan to fix this by using CW voltage multiplier in the future]

---

For another change i also used a different capacitor in the feedback which is only about 5kV and its capacity is way too large
this should not be much of an issue unless i short out the jarlid^tm^ capacitor while running at high powers, but i do plan to replace it

I also think that i should up the number of turns on the L1 (first) inductor, as that seems to have worked better for others

![feedback ceramic capacitor with a jar lid attached](__IMAGE__/feedback_2.jpg)
![feedback setup](__IMAGE__/feedback_1.jpg)

## some results
For now i havent been able to get much, but i plan improve on the output with the aforementioned ideas

I was able to get some neat images of what is seemingly a neon bulb being excited in an interesting way

Despite being filled with neon (for the most part) giving a deep orange color in the EMF of my standard SSTC
it gives off a blue glow here.. this could be caused by some mixed in argon or mercury vapor (no droplets seem to be forming inside the glass)

Heres a picture with the tube being somewhat spaced from the *"antenna"*

![blue glowing bulb oooo](__IMAGE__/output_1.jpg)

And here it is placed right next to the *"antenna"* where you can see some of the neon orange starting to show at the contact point

![blue glowing bulb oooo](__IMAGE__/output_2.jpg)

---

[color = orange][This causes lots of interference, a radio far away across the house is unusable][color = red][!]

Hopefully i can get some more arcs (over several cm) out of this circuits soon^tm^ and post some updates here.

---
### sidenote

A fun way to start a project is to realize some of your components are unusable

For me, i found out one of my MOT has died and that my microwave diode is dead aswell

This lead me to make an abomination of a diode (which somehow didnt explode yet) out of 1N4007 diodes

As for the MOT i just used a different one after realizing trying to save it is futile..

![diode replacement zoomed out](__IMAGE__/supply_4.jpg)
![diode replacement](__IMAGE__/supply_2.jpg)
![rip mot](__IMAGE__/supply_3.jpg)