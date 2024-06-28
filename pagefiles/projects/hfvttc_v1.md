[font-size = 1.4em]{
Despite collecting tons of tubes,
I haven't done much with them other than small experiments
}

So I have finally decided to build some sort of a Tesla coil, starting with an HFVTTC.

Whether or not this was a good starting point, I have no idea, but the schematic is rather straightforward.

My design was based on this one by uzzors2k:

![Epic toob schematic](__IMAGE__/schematic/uzzors2k_hfvttc.png)
![showcase of my build](__IMAGE__/general_4.jpg)
![showcase of my build the second](__IMAGE__/general_9.jpg)

---

The difference was mainly that I used a different tube, and handled the g2 power differently.

I am for now using **GU50 Soviet pentode**, while he used a way more powerful GK-71.

As for the G2 supply, I am currently using rectified mains (filtered) which is put across g2 and the cathode instead of a large resistor which just connects G2 anode potential.

![g2 power supply](__IMAGE__/supply_1.jpg)

This leads to a low G2 voltage of only about 110V. I plan to fix this by using a CW voltage multiplier in the future.

**Note:** In a further iteration, this was no longer an issue since the circuit was driven with way higher voltage anyway.

---

For another change, I also used a different capacitor in the feedback which is only about 5kV and its capacity is way too large. This should not be much of an issue unless I short out the jar lid™ capacitor while running at high powers, but I do plan to replace it.

I also think that I should up the number of turns on the L1 (first) inductor, as that seems to have worked better for others.

![feedback ceramic capacitor with a jar lid attached](__IMAGE__/feedback_2.jpg)
![feedback setup](__IMAGE__/feedback_1.jpg)

### Updates[^updates]
[^updates]: Updates

Both the resonator coil and the choke have been rewound:

- Resonator: ~23 turns
- Choke: ??? I don't know, I eyeballed it.

I have also split them off so they are no longer on the same coil form. I specifically 3D printed a 5cm wide 7cm high form for the choke.

![new resonator setup](__IMAGE__/resonator_3.jpg)
![new resonator setup](__IMAGE__/general_10.jpg)

I have also pushed way higher voltage into the setup which helped the initial arc to stay ignited.

## Some Results
~~For now, I haven't been able to get much, but I plan to improve the output with the aforementioned ideas.~~ Resolved in the section above.

Here are some arcs produced by this setup, from what I'd guess they are maybe 10cm+ at best and the tube only starts redplating at very high powers. Since this run I somehow managed to "kill" the setup, it still works but the arc doesn't grow as much with the voltage.

I will probably try rebuilding it for it to be a bit cleaner and handle the high voltages a bit better, but for now I'm a bit clueless about what happened since the setup didn't change at all. I am still quite happy with the results I was able to get. [Here is a video of the coil running](https://www.youtube.com/shorts/fzB8J2L6n1E)

![small arc](__IMAGE__/output_3.jpg)
![big boy arc](__IMAGE__/output_4.jpg)

I was also able to get some neat images of what is seemingly a neon bulb being excited in an interesting way.

Despite being filled with neon (for the most part) giving a deep orange color in the EMF of my standard SSTC, it gives off a blue glow here. This could be caused by some mixed-in argon or mercury vapor (no droplets seem to be forming inside the glass).

Here's a picture with the tube being somewhat spaced from the "antenna":

![blue glowing bulb](__IMAGE__/output_1.png)

And here it is placed right next to the "antenna" where you can see some of the neon orange starting to show at the contact point:

![blue glowing bulb](__IMAGE__/output_2.png)

---

[color = orange][This causes lots of interference; a radio far away across the house is unusable.][color = red][!]

Hopefully, I can get some more arcs (over several cm) out of this circuit soon™ and post some updates here.

---
### Sidenote

A fun way to start a project is to realize some of your components are unusable.

For me, I found out one of my MOT has died and that my microwave diode is dead as well.

This led me to make an abomination of a diode (which somehow didn't explode yet) out of 1N4007 diodes.

As for the MOT, I just used a different one after realizing trying to save it is futile.

![diode replacement zoomed out](__IMAGE__/supply_4.jpg)
![diode replacement](__IMAGE__/supply_5.jpg)
![RIP MOT](__IMAGE__/supply_3.jpg)