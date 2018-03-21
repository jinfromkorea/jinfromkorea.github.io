---
layout: page
title: ubuntu
---

# ubuntu

[fstab remount](./ubuntu.html#fstab)  
[network 확인](./ubuntu.html#network)  
[fileserver 확인](./ubuntu.html#fileserver)  
[booting 디스크 만들기](./ubuntu.html#booting-disk)  

## fstab

`/etc/fstab` 파일의 내용은 다음과 같다. options 값이 바뀌었음. 

```bash
jinia@jin:~$ sudo cat /etc/fstab
[sudo] password for jinia: 
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda1 during installation
UUID=d42a2744-2672-475f-9d6c-4223d2fdbb49 /               ext4    errors=remount-ro,noatime,discard        0       1
# /boot was on /dev/sda5 during installation
UUID=3bad1527-e2dc-4ecf-b2f1-9f15b6eeb8b7 /boot           ext4    errors=remount-ro,noatime,discard        0       2
# /home was on /dev/sda7 during installation
UUID=51c5417b-ca30-4c74-b028-381319f0fa51 /home           ext4    errors=remount-ro,noatime,discard        0       2
# swap was on /dev/sda6 during installation
UUID=08502cb2-b326-42fe-90ba-923e45913273 none            swap    sw              0       0
```


## network

회사에서 ping이 나가는지만 체크하면 될듯. 
```
ping 192.168.41.1
ping www.solutionpot.co.kr
```

`/etc/netplan/01-netcfg.yaml` 파일에 네트워크 설정 정보는 들어가 있음.  
nameservers의 addresses는 xxx.xxx.xxx.xxx 로 되어있으니, 적당히 본인이 사용하는 DNS ip를 적길.. 

```bash
jinia@jin:~$ cat /etc/netplan/01-netcfg.yaml 
# This file describes the network interfaces available on your system
# For more information, see netplan(5).
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      addresses: [ 192.168.41.81/24 ]
      gateway4: 192.168.41.1
      nameservers:
              addresses: [ xxx.xxx.xxx.xxx, xxx.xxx.xxx.xxx ]
jinia@jin:~$ 
```

## fileserver

윈도우에서는 탐색기에서 네트워크 드라이브로 다음과 같이 연결해서 사용했는데. ubuntu는 없는지라.. 

```
\\xxx.xxx.xxx.xxx\swdev
```
다음과 같이 ssh로 연결해서 사용하면 된다. 파일 서버 IP는 203. 어쩌고였음. 

```
ssh fxxxxx@xxx.xxx.xxx.xxx
cd /media/data/swdev
```



## booting disk

USB 부팅디스크 만들기는 [http://sergeswin.com/1178](http://sergeswin.com/1178) 참고해서 만들었음. 

```
cd ~/Downloads
sudo dd if=./ubuntu-16.04.3-desktop-amd64.iso of=/dev/mmcblk0p1
```

usb 경로를 알아내는 거는 `fdisk -l`을 이용하면 됨.  
`wget` 으로 iso파일 다운로드 받아도 됨. 

```bash
jinia@jin:~$ cd Downloads
jinia@jin:~/Downloads$ wget http://ftp.riken.jp/Linux/ubuntu-releases/16.04.3/ubuntu-16.04.3-desktop-i386.iso
--2017-12-22 09:24:23--  http://ftp.riken.jp/Linux/ubuntu-releases/16.04.3/ubuntu-16.04.3-desktop-i386.iso
Resolving ftp.riken.jp (ftp.riken.jp)... 134.160.38.1
Connecting to ftp.riken.jp (ftp.riken.jp)|134.160.38.1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1607467008 (1.5G) [application/x-iso]
Saving to: ‘ubuntu-16.04.3-desktop-i386.iso’

ubuntu-16.04.3-desktop-i 100%[=================================>]   1.50G  1.07MB/s    in 25m 34s 

2017-12-22 09:49:58 (1023 KB/s) - ‘ubuntu-16.04.3-desktop-i386.iso’ saved [1607467008/1607467008]

jinia@jin:~/Downloads$ ls -al
total 3252744
drwxr-xr-x  2 jinia jinia       4096 Dec 22 09:26 .
drwxr-xr-x 26 jinia jinia       4096 Dec 22 09:06 ..
-rw-rw-r--  1 jinia jinia 1587609600 Dec 21 14:05 ubuntu-16.04.3-desktop-amd64.iso
-rw-r--r--  1 jinia jinia 1607467008 Aug  1 20:52 ubuntu-16.04.3-desktop-i386.iso
jinia@jin:~/Downloads$ sudo fdisk -l
[sudo] password for jinia: 
Disk /dev/sda: 238.5 GiB, 256060514304 bytes, 500118192 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xc76b7166

Device     Boot    Start       End   Sectors   Size Id Type
/dev/sda1  *        2048  58593279  58591232    28G 83 Linux
/dev/sda2       58595326 500117503 441522178 210.5G  5 Extended
/dev/sda5       58595328  59592703    997376   487M 83 Linux
/dev/sda6       59594752  75216895  15622144   7.5G 82 Linux swap / Solaris
/dev/sda7       75218944 500117503 424898560 202.6G 83 Linux


Disk /dev/mmcblk0: 3.7 GiB, 3965190144 bytes, 7744512 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device         Boot Start     End Sectors  Size Id Type
/dev/mmcblk0p1       8192 7744511 7736320  3.7G  b W95 FAT32
jinia@jin:~/Downloads$ sudo dd if=./ubuntu-16.04.3-desktop-i386.iso of=/dev/mmcblk0p1
[sudo] password for jinia: 
3139584+0 records in
3139584+0 records out
1607467008 bytes (1.6 GB, 1.5 GiB) copied, 1824.78 s, 881 kB/s
jinia@jin:~/Downloads$ 
```