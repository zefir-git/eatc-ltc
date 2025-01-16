# London Terminal Control for Endless ATC

**London Terminal Control** is a custom airspace for [*Endless ATC*](https://startgrid.itch.io/endlessatc), designed to
enhance your gameplay experience with
detailed airspace management for London airports using STARs and SIDs.

## Installation

Follow these steps to add the custom airspace to your game:

0. Download the `LTCC.ini` file from the [latest release](https://github.com/zefir-git/eatc-ltc/releases/latest) on
   GitHub.

> [!NOTE]
> You need the full (paid) version of *Endless ATC*; the demo or lite version will not work.

### Steam (PC)

1. Open <kbd>Steam</kbd> and go to your <kbd>Library</kbd>.
2. Right-click on *Endless ATC* and select <kbd>Manage</kbd> → <kbd>Browse local files</kbd>.
3. Copy or move the `LTCC.ini` file into the <kbd>locations</kbd> folder.
4. Launch *Endless ATC*.
5. In the game, go to the menu and select <kbd>≡</kbd> → <kbd>airports</kbd>. You should see the <kbd>LTCC</kbd> button
   at the bottom of the screen.

#### File Paths:

- On **Linux**, the path is typically:  
  `~/.local/share/Steam/steamapps/common/Endless ATC/locations`
- On **Windows**, the path might be:  
  `C:\Program Files\Steam\steamapps\common\Endless ATC\locations`

### Android

1. Connect your phone to your computer via USB and enable file transfer.
2. On your computer, open the file manager and locate your connected phone.
3. Navigate to <kbd>Internal storage</kbd>.
4. Copy or move the `LTCC.ini` file into the following folder:  
   <kbd>Android/data/com.dirgtrats.endlessatc/files/locations</kbd>
5. Launch *Endless ATC* on your device.
6. In the game, tap the <kbd>⋮</kbd> menu → <kbd>airports</kbd>. You should see the <kbd>LTCC</kbd> button at the bottom
   of the screen.

## Airports

- ### `EGLL` Heathrow Airport
  Only runways 27L/R currently available. Runways 9L/R will be added soon.
  <br>Approach transition via radar vectors only.
- ### `EGKK` Gatwick Airport
  Both runways 26L/R available with same STARs and SIDs. Only runway 26L currently selectable in runway configuration.
  <br>Approach transition via radar vectors only.
- ### `EGSS` Stansted Airport
  Not yet available.
- ### `EGGW` Luton Airport
  Only runway 25 currently available. Runway 7 will be added soon.
  <br>Approach transition via radar vectors,
  or [`ZAGZO 1T`](https://web.archive.org/web/20241130183249if_/https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/AIP/Current-AIRAC/graphics/321263.pdf)
  to RWY 25.
- ### `EGLC` London City Airport
  Only runway 27 currently available. Runway 9 will be added soon.
  <br>Approach transition via radar vectors,
  or [`LAVNO 1G 1J`](https://web.archive.org/web/20250116120625if_/https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/AIP/Current-AIRAC/graphics/399531.pdf)
  from GODLU or JACKO to RWY 27.

## Runway Configurations

The following is a list of available runway configurations. You can select the configuration in-game by choosing *
*Runways** and selecting your preferred setup. The required game score to unlock each runway configuration is listed in
parentheses.

| # | EGLL                                     | EGKK         | EGGW         | EGLC         |
|---|------------------------------------------|--------------|--------------|--------------|
| 1 | `↓ 27L` `↑ 27R`                          | `↓↑ 26L` (8) | `↓↑ 25` (12) | `↓↑ 27` (18) |
| 2 | `↑ 27L` `↓ 27R`                          | `↓↑ 26L` (8) | `↓↑ 25` (12) | `↓↑ 27` (18) |
| 3 | `↓ 27L` `↑ 27R`<br>`↓ 27L` `↓↑ 27R` (23) | `↓↑ 26L` (8) | `↓↑ 25` (12) | `↓↑ 27` (18) |
| 4 | `↑ 27L` `↓ 27R`<br>`↓↑ 27L` `↓ 27R` (23) | `↓↑ 26L` (8) | `↓↑ 25` (12) | `↓↑ 27` (18) |

## Issues and Suggestions

If you encounter any issues, such as aircraft leaving the airspace while following a STAR, inaccurate pronunciations, or
anything else, please [open a new GitHub Issue](https://github.com/zefir-git/eatc-ltc/issues/new?labels=bug).

To suggest improvements or request features, you can also open
a [GitHub Issue](https://github.com/zefir-git/eatc-ltc/issues/new).

Alternatively, you can get in touch with us through the following channels:

<dl>
  <dt>Matrix</dt>
  <dd><a href="https://matrix.to/#/@zefir:cloudnode.pro">@zefir:cloudnode.pro</a></dd>

  <dt>E-mail</dt>
  <dd><a href="mailto:eatc+ltc@zefir.pro">eatc+ltc@zefir.pro</a></dd>
</dl>

## Airlines Traffic Simulation

This airspace uses [`eatc-airlines`](https://github.com/zefir-git/eatc-airlines) to generate realistic airlines and
flights configurations.

## Licence

Copyright © 2025 Zefir Kirilov.

This custom airspace is released under
the [GNU General Public License, Version 3](https://www.gnu.org/licenses/gpl-3.0.en.html).
