#!/bin/bash

# ========= hf-server ============
#
# Autor: Antonio Paya Gonzalez
#
# ================================

# ============ VARIABLES =============
DIR=$PWD/keys
BLOCKDIR="$1"
OPTS="-i"

function copyHfc(){
    cd $PWD
    if [ -d ./keys ]; then
        rm -rf ./keys
    fi

    echo 
    echo "---------- Copiando hfc-key-store --------------"
    echo
    mkdir keys
    cd $DIR

    cp -a $BLOCKDIR/hfc-key-store/chicago/. $DIR
}

function copyPeerOrderer(){
    echo 
    echo "---------- Copiando peer keys--------------"
    echo

    cd $DIR

    cp $BLOCKDIR/crypto-config/peerOrganizations/chicago.arcelormittal.com/peers/peer0.chicago.arcelormittal.com/msp/tlscacerts/tlsca.chicago.arcelormittal.com-cert.pem $DIR

    echo 
    echo "---------- Copiando orderer keys--------------"
    echo

    cd $DIR

    cp $BLOCKDIR/crypto-config/ordererOrganizations/arcelormittal.com/msp/tlscacerts/tlsca.arcelormittal.com-cert.pem $DIR
}

copyHfc
copyPeerOrderer